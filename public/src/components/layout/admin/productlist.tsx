'use client'
import { useEffect, useState } from 'react';
import {
    Table,
    Button,
    Space,
    Image,
    Tag,
    Popconfirm,
    message,
    Input,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import type { ColumnsType } from 'antd/es/table';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    brand: { _id: string; name: string };
    shortDescription: string;
    status: 'active' | 'hidden';
}

const ProductListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/product');
            const data = await res.json();
            setProducts(data.items ?? data);
        } catch {
            message.error('Không tải được danh sách sản phẩm');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/product/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            message.success('Đã xóa sản phẩm');
            setProducts((prev) => prev.filter((p) => p._id !== id));
        } catch {
            message.error('Xóa sản phẩm thất bại');
        }
    };

    const formatPrice = (price: number) =>
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    const columns: ColumnsType<Product> = [
        {
            title: 'Ảnh',
            dataIndex: 'images',
            width: 80,
            render: (images: string[]) => (
                <Image
                    src={images?.[0]}
                    alt="product"
                    width={56}
                    height={56}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    fallback="/images/no-image.png"
                />
            ),
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            render: (name: string, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>
                        {record.shortDescription}
                    </div>
                </div>
            ),
        },
        {
            title: 'Thương hiệu',
            dataIndex: ['brand', 'name'],
            width: 140,
            render: (brandName: string) => <Tag color="blue">{brandName}</Tag>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            width: 150,
            sorter: (a, b) => a.price - b.price,
            render: (price: number) => formatPrice(price),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 120,
            render: (status: string) =>
                status === 'active' ? (
                    <Tag color="green">Đang bán</Tag>
                ) : (
                    <Tag color="default">Đã ẩn</Tag>
                ),
        },
        {
            title: 'Hành động',
            width: 120,
            render: (_, record) => (
                <Space>
                    <Link href={`/dashboard/product/edit/${record._id}`}>
                        <Button icon={<EditOutlined />} size="small" />
                    </Link>
                    <Popconfirm
                        title="Xóa sản phẩm này?"
                        description="Hành động này không thể hoàn tác."
                        onConfirm={() => handleDelete(record._id)}
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

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
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
                <h2 style={{ margin: 0 }}>Quản lý sản phẩm</h2>
                <Link href="/dashboard/product/add">
                    <Button type="primary" icon={<PlusOutlined />}>
                        Thêm sản phẩm
                    </Button>
                </Link>
            </div>

            <Input
                placeholder="Tìm kiếm theo tên sản phẩm..."
                prefix={<SearchOutlined />}
                style={{ marginBottom: 16, maxWidth: 320 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={filteredProducts}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered={false}
            />
        </div>
    );
};

export default ProductListPage;