'use client'
import { AdminContext } from '@/public/src/library/admin.context';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Layout, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';
import { useContext } from 'react';
import Link from 'next/link';
import { logout } from '../../services/auth.service';

const AdminHeader = (props: any) => {
    const { Header } = Layout;
    const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

    const email = props.session?.user?.email ?? 'Admin';
    const avatarUrl = props.session.user.avatar ?? 'Admin';
    const initials = email?.[0]?.toUpperCase() ?? 'A';

    const items: MenuProps['items'] = [
        {
            key: 'info',
            disabled: true,
            label: (
                <div style={{ padding: '4px 0' }}>
                    <div style={{ fontWeight: 600, color: '#1f1f1f' }}>{email}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>Quản trị viên</div>
                </div>
            ),
        },
        { type: 'divider' },
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: <Link href="/dashboard/profile">Hồ sơ cá nhân</Link>,
        },
        {
            key: 'setting',
            icon: <SettingOutlined />,
            label: <Link href="/dashboard/setting">Cài đặt</Link>,
        },
        { type: 'divider' },
        {
            key: 'logout',
            danger: true,
            icon: <LogoutOutlined />,
            label: <span onClick={() => logout()}>Đăng xuất</span>,
        },
    ];

    return (
        <Header
            style={{
                padding: 0,
                height: 64,
                display: 'flex',
                background: '#fff',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            }}
        >
            <Button
                type="text"
                icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapseMenu(!collapseMenu)}
                style={{
                    fontSize: 16,
                    width: 64,
                    height: 64,
                }}
            />

            <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement="bottomRight"
            >
                {/* Di chuyển style vào đây hoặc bọc bằng thẻ div */}
                <Space
                    size={10}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: 'unset',
                        marginRight: 24,
                        padding: '6px 12px',
                        borderRadius: 8,
                        cursor: 'pointer',
                    }}
                >
                    <Avatar
                        size={52}
                        src={avatarUrl ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${avatarUrl}` : undefined}
                    >
                        {initials}
                    </Avatar>
                    <span style={{ lineHeight: 1.2 }}>
                        <div style={{ fontSize: 13, color: '#8c8c8c' }}>Chào,</div>
                        <strong style={{ fontSize: 14 }}>{email}</strong>
                    </span>
                    <DownOutlined style={{ fontSize: 11, color: '#8c8c8c' }} />
                </Space>
            </Dropdown>
        </Header>
    );
};

export default AdminHeader;