'use client'
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  message,
  Row,
  Upload,
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  CameraOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { useEffect, useState } from 'react';
import { userService } from '@/public/src/services/user.service';
import { profile } from '@/public/src/types/type'

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.addEventListener('error', (error) => reject(error));
    reader.readAsDataURL(file);
  });


interface ProfileFormValues {
  full_name: string;
  phone: string;
  email: string;
}

interface PasswordFormValues {
  current_password: string;
  password: string;
  password_confirmation: string;
}

const Profile = () => {


  const [profileForm] = Form.useForm<ProfileFormValues>();
  const [passwordForm] = Form.useForm<PasswordFormValues>();
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<RcFile | null>(null);

  const beforeUploadAvatar = async (file: RcFile) => {
    const isImage = file.type.startsWith("image/");

    if (!isImage) {
      message.error("Chỉ chấp nhận file ảnh");
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      message.error("Ảnh phải nhỏ hơn 2MB");
      return Upload.LIST_IGNORE;
    }

    setAvatarFile(file);

    const base64 = await getBase64(file);
    setAvatarUrl(base64);

    return false;
  };


  // Lấy thông tin user hiện tại khi vào trang
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {

      const res = await userService.getProfile() as { data: profile };

      profileForm.setFieldsValue({
        full_name: res.data.full_name,
        phone: res.data.phone,
        email: res.data.email,
      });

      if (res.data.avatar) {
        setAvatarUrl(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${res.data.avatar}`
        );
      }

    } catch {

      message.error("Không tải được thông tin");

    }
  };





  const handleUpdateProfile = async (
    values: ProfileFormValues
  ) => {

    setSavingProfile(true);
console.log('check values', values);
    try {

      const formData = new FormData();

      formData.append("full_name", values.full_name);

      formData.append("phone", values.phone);

      formData.append("email", values.email);

      if (avatarFile) {

        formData.append("avatar", avatarFile);

      }

      await userService.updateProfile(formData);

      message.success("Cập nhật thành công");

      loadProfile();

    } catch (e: any) {

      message.error(e.message);

    } finally {

      setSavingProfile(false);

    }
  };

  const handleChangePassword = async (
    values: PasswordFormValues
  ) => {
    setSavingPassword(true);
    console.log('check values', values);

    try {
      await userService.changePassword(values);

      passwordForm.resetFields();

      message.success("Đổi mật khẩu thành công");
    } catch {
      message.error("Đổi mật khẩu thất bại");
    } finally {
      setSavingPassword(false);
    }
  };
  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <h2 style={{ marginBottom: 24 }}>Hồ sơ cá nhân</h2>

      <Row gutter={24}>
        <Col xs={24} md={8}>
          <Card style={{ textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                size={120}
                src={avatarUrl || undefined}
                icon={!avatarUrl && <UserOutlined />}
                
              />
              <Upload
                showUploadList={false}
                beforeUpload={beforeUploadAvatar}
              >
                <Button
                  shape="circle"
                  icon={<CameraOutlined />}
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                  }}
                />
              </Upload>
            </div>
            <p style={{ marginTop: 16, color: '#8c8c8c', fontSize: 13 }}>
              Cho phép JPG, PNG. Tối đa 2MB.
            </p>
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card title="Thông tin cá nhân">
            <Form form={profileForm} layout="vertical" onFinish={handleUpdateProfile}>
              <Form.Item
                name="full_name"
                label="Họ và tên"
                rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
              >
                <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[
                  { required: true, message: 'Vui lòng nhập số điện thoại' },
                  {
                    pattern: /^(0|\+84)[0-9]{9,10}$/,
                    message: 'Số điện thoại không hợp lệ',
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="0901234567" />
              </Form.Item>

              <Form.Item name="email" label="Email">
                <Input disabled placeholder="email@example.com" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={savingProfile}>
                  Lưu thay đổi
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col xs={24} md={16}>
          <Card title="Đổi mật khẩu">
            <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword}>
              <Form.Item
                name="current_password"
                label="Mật khẩu hiện tại"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Mật khẩu mới"
                rules={[
                  { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                  { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
              </Form.Item>

              <Form.Item
                name="password_confirmation"
                label="Xác nhận mật khẩu mới"
                dependencies={["password"]}
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu mới" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Mật khẩu xác nhận không khớp")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" danger htmlType="submit" loading={savingPassword}>
                  Đổi mật khẩu
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;