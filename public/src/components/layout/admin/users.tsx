'use client'
import { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Space,
    Tag,
    Popconfirm,
    message,
    Input,
    Modal,
    Form,
    Select,
    Avatar,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { userService } from '@/public/src/services/user.service';

interface UserItem {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    avatar: string;
    role: 'admin' | 'staff';
    status: 0 | 1;
    createdAt: string;
}

const roleConfig: Record<UserItem['role'], { color: string; text: string }> = {
    admin: { color: 'red', text: 'Quản trị viên' },
    staff: { color: 'blue', text: 'Nhân viên' },
};

const Users = () => {
    const [users, setUsers] = useState<UserItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<UserItem | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const fetchUsers = async () => {
        setLoading(true);

        try {

            const res = await userService.getUsers();

            setUsers(res.data);
            console.log('ressssssss', res.data)

        } catch {

            message.error("Không tải được danh sách người dùng");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const openAddModal = () => {
        setEditingUser(null);
        form.resetFields();
        setModalOpen(true);
    };

    const openEditModal = async (user: UserItem) => {

        try {

            const res = await userService.getUser(user.id);

            const data = res.data;

            setEditingUser(data);

            form.setFieldsValue({

                full_name: data.full_name,

                email: data.email,

                phone: data.phone,

                role: data.role,

            });

            setModalOpen(true);

        } catch {

            message.error("Không lấy được thông tin người dùng");

        }

    };

    const handleDelete = async (id: number) => {

        try {

            await userService.deleteUser(id);

            message.success("Đã xóa người dùng");

            fetchUsers();

        } catch {

            message.error("Xóa thất bại");

        }

    };

    const handleSubmit = async (values: any) => {

        setSubmitting(true);

        try {

            const payload = {

                full_name: values.full_name,

                email: values.email,

                phone: values.phone,

                role: values.role,

                ...(values.password && {
                    password: values.password,
                }),

            };

            if (editingUser) {

                await userService.updateUser(editingUser.id, payload);

                message.success("Cập nhật thành công");

            } else {

                await userService.createUser(payload);

                message.success("Thêm thành công");

            }

            setModalOpen(false);

            fetchUsers();

        } catch (e: any) {

            message.error(e.message);

        } finally {

            setSubmitting(false);

        }

    };

    const columns: ColumnsType<UserItem> = [
        {
            title: 'Người dùng',
            dataIndex: 'full_name',
            render: (full_name: string, record) => (
                <Space>
                    <Avatar
                        src={
                            `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${record.avatar}`
                        }
                        size={42}
                    >
                        {record.full_name?.charAt(0)?.toUpperCase() ?? 'U'}
                    </Avatar>
                    <div>
                        <div style={{ fontWeight: 500 }}>{record.full_name}</div>
                        <div style={{ fontSize: 12, color: '#8c8c8c' }}>{record.email}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            width: 140,
        },
        {
            title: 'Vai trò',
            dataIndex: 'role',
            width: 140,
            render: (role: UserItem['role']) => (
                <Tag color={roleConfig[role].color}>{roleConfig[role].text}</Tag>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 120,
            render: (status: boolean) =>
                status === true ? (
                    <Tag color="green">Hoạt động</Tag>
                ) : (
                    <Tag color="default">Đã khóa</Tag>
                ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'created_at',
            width: 130,
            render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
        },
        {
            title: 'Hành động',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => openEditModal(record)}
                    />
                    <Popconfirm
                        title="Xóa người dùng này?"
                        description="Hành động này không thể hoàn tác."
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button icon={<DeleteOutlined />} size="small" danger />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const filteredUsers = users.filter(
        (u) =>
            u.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
            u.email.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{ padding: 24 }}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20,
                }}
            >
                <h2 style={{ margin: 0 }}>Quản lý người dùng</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
                    Thêm người dùng
                </Button>
            </div>

            <Input
                placeholder="Tìm theo tên hoặc email..."
                prefix={<SearchOutlined />}
                style={{ marginBottom: 16, maxWidth: 320 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={filteredUsers}
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={editingUser ? 'Sửa người dùng' : 'Thêm người dùng mới'}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="full_name"
                        label="Họ và tên"
                        rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                            { type: 'email', message: 'Email không hợp lệ' },
                        ]}
                    >
                        <Input placeholder="email@example.com" disabled={!!editingUser} />
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
                        <Input placeholder="0901234567" />
                    </Form.Item>

                    <Form.Item
                        name="role"
                        label="Vai trò"
                        rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}
                    >
                        <Select
                            placeholder="Chọn vai trò"
                            options={[
                                { value: 'admin', label: 'Quản trị viên' },
                                { value: 'staff', label: 'Nhân viên' },
                                { value: 'customer', label: 'Khách hàng' },
                            ]}
                        />
                    </Form.Item>

                    {!editingUser && (
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                            ]}
                        >
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>
                    )}

                    {editingUser && (
                        <Form.Item
                            name="password"
                            label="Mật khẩu mới (để trống nếu không đổi)"
                        >
                            <Input.Password placeholder="••••••••" />
                        </Form.Item>
                    )}

                    <Form.Item style={{ marginTop: 24, marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setModalOpen(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                {editingUser ? 'Cập nhật' : 'Thêm người dùng'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Users;