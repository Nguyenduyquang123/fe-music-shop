'use client'
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import {
    DashboardOutlined,
    TeamOutlined,
    ShoppingOutlined,
    FileTextOutlined,
    PictureOutlined,
    PhoneOutlined,
    InfoCircleOutlined,
    FormOutlined,
    SettingOutlined,
    PlusOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import React, { useContext } from 'react';
import { AdminContext } from "@/public/src/library/admin.context";
import { Avatar, Image, type MenuProps } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from "@/public/src/assets/image/logp.jpg";

type MenuItem = Required<MenuProps>['items'][number];

const AdminSideBar = (props: any) => {
    const { Sider } = Layout;
    const { collapseMenu } = useContext(AdminContext)!;
    const pathname = usePathname();


    const items: MenuItem[] = [
        {
            key: "dashboard",
            label: <Link href="/dashboard">Tổng quan</Link>,
            icon: <DashboardOutlined />,
        },
        {
            key: "users",
            label: <Link href="/dashboard/user">Người dùng</Link>,
            icon: <TeamOutlined />,
        },
        {
            key: "products",
            label: "Sản phẩm",
            icon: <ShoppingOutlined />,
            children: [
                {
                    key: "products-all",
                    label: <Link href="/dashboard/product">Tất cả sản phẩm</Link>,
                },
                {
                    key: "products-add",
                    label: <Link href="/dashboard/product/add">Thêm sản phẩm</Link>,
                    icon: <PlusOutlined />,
                },
                {
                    key: "products-category",
                    label: <Link href="/dashboard/product/category">Danh mục</Link>,
                    icon: <AppstoreOutlined />,
                },
                {
                    key: "products-brands",
                    label: <Link href="/dashboard/product/brands">Thương hiệu</Link>,
                    icon: <AppstoreOutlined />,
                },
            ],
        },
        {
            key: "blog",
            label: "Blog",
            icon: <FileTextOutlined />,
            children: [
                {
                    key: "blog-all",
                    label: <Link href="/dashboard/blog">Tất cả bài viết</Link>,
                },
                {
                    key: "blog-add",
                    label: <Link href="/dashboard/blog/add">Viết bài mới</Link>,
                    icon: <PlusOutlined />,
                },
                {
                    key: "blog-category",
                    label: <Link href="/dashboard/blog/category">Danh mục blog</Link>,
                    icon: <AppstoreOutlined />,
                },
            ],
        },
        {
            type: "divider",
        },
        {
            key: "content-grp",
            label: "Nội dung trang web",
            type: "group",
            children: [
                {
                    key: "banner",
                    label: <Link href="/dashboard/banner">Banner</Link>,
                    icon: <PictureOutlined />,
                },
                {
                    key: "about",
                    label: <Link href="/dashboard/about">Giới thiệu</Link>,
                    icon: <InfoCircleOutlined />,
                },
                {
                    key: "contact",
                    label: <Link href="/dashboard/contact">Liên hệ</Link>,
                    icon: <PhoneOutlined />,
                },
                {
                    key: "site-text",
                    label: <Link href="/dashboard/content">Chữ trên web</Link>,
                    icon: <FormOutlined />,
                },
            ],
        },
        {
            type: "divider",
        },
        {
            key: "settings",
            label: <Link href="/dashboard/setting">Cài đặt</Link>,
            icon: <SettingOutlined />,
        },
    ];

    const getSelectedKey = () => {
        if (!pathname) return "dashboard";
        if (pathname.startsWith("/dashboard/user")) return "users";
        if (pathname.startsWith("/dashboard/product/add")) return "products-add";
        if (pathname.startsWith("/dashboard/product/category")) return "products-category";
        if (pathname.startsWith("/dashboard/product/brands")) return "products-brands";
        if (pathname.startsWith("/dashboard/product")) return "products-all";
        if (pathname.startsWith("/dashboard/blog/add")) return "blog-add";
        if (pathname.startsWith("/dashboard/blog/category")) return "blog-category";
        if (pathname.startsWith("/dashboard/blog")) return "blog-all";
        if (pathname.startsWith("/dashboard/banner")) return "banner";
        if (pathname.startsWith("/dashboard/about")) return "about";
        if (pathname.startsWith("/dashboard/contact")) return "contact";
        if (pathname.startsWith("/dashboard/content")) return "site-text";
        if (pathname.startsWith("/dashboard/setting")) return "settings";
        return "dashboard";
    };

    return (
        <Sider
            collapsed={collapseMenu}
            width={250}
            style={{
                minHeight: "100vh",
                background: "#fff",
                boxShadow: "2px 0 8px rgba(0,0,0,0.06)",
            }}
        >
            <div
                style={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapseMenu ? "center" : "flex-start",
                    padding: collapseMenu ? 0 : "0 20px",
                    borderBottom: "1px solid #f0f0f0",
                    overflow: "hidden",
                }}
            >
                <Image
                    src={logo.src}
                    alt="Logo"
                    width={66}
                    height={66}
                    className="object-cover rounded-[50%]"
                />
                {!collapseMenu && (
                    <span
                        style={{
                            marginLeft: 12,
                            fontWeight: 700,
                            fontSize: 16,
                            color: "#1f1f1f",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Camus Music
                    </span>
                )}
            </div>

            <Menu
                mode="inline"
                selectedKeys={[getSelectedKey()]}
                defaultOpenKeys={["products", "blog"]}
                items={items}
                style={{
                    height: "calc(100vh - 64px)",
                    borderRight: 0,
                    padding: "8px 0",
                }}
            />
        </Sider>
    );
};

export default AdminSideBar;