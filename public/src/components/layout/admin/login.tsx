"use client";

import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Typography,
  message,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const { Title, Text } = Typography;

interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginForm) => {
    setLoading(true);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      message.error("Email hoặc mật khẩu không đúng");
      return;
    }

    message.success("Đăng nhập thành công");

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <Card
        style={{
          width: 420,
          borderRadius: 12,
        }}
      >
        <div className="text-center mb-8">

          <Title level={2}>
            Nhạc Cụ Việt
          </Title>

          <Text type="secondary">
            Hệ thống quản trị
          </Text>

        </div>

        <Form
          layout="vertical"
          onFinish={onFinish}
        >

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập email",
              },
              {
                type: "email",
                message: "Email không hợp lệ",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined />}
              placeholder="admin@gmail.com"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mật khẩu",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="********"
              size="large"
            />
          </Form.Item>

          <div className="flex justify-between mb-5">

            <Form.Item
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>
                Ghi nhớ đăng nhập
              </Checkbox>
            </Form.Item>

            <a href="#">
              Quên mật khẩu?
            </a>

          </div>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
          >
            Đăng nhập
          </Button>

        </Form>

      </Card>

    </div>
  );
}