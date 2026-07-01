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
import { productService } from '@/public/src/services/product.service';
import { Product } from '@/public/src/types/type';

const ProductListPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const fetchProducts = async () => {

        setLoading(true);

        try {

            const res = await productService.getProducts() as { data: Product[] };

            setProducts(res.data);

        } catch {

            message.error("Không tải được danh sách sản phẩm");

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: number) => {

        try {

            await productService.deleteProduct(id);

            message.success("Đã xóa sản phẩm");

            fetchProducts();

        } catch {

            message.error("Xóa thất bại");

        }

    };

    const formatPrice = (price: number) =>
        price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    const columns: ColumnsType<Product> = [
        {
            title: "Ảnh",
            dataIndex: "thumbnail",
            width: 80,
            render: (thumbnail: string | null) => (
                <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${thumbnail}`}
                    width={60}
                    height={60}
                    style={{
                        objectFit: "cover",
                        borderRadius: 8,
                    }}
                />
            ),
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            render: (_, record) => (
                <>
                    <div style={{ fontWeight: 600 }}>
                        {record.name}
                    </div>
                </>
            ),
        },
        {
            title: "SKU",
            dataIndex: "sku",
            width: 120,
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            width: 200,
            render: (category: any) => <Tag color="blue">{category?.name}</Tag>,
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
            render: (_, record) => (
                <>
                    <div>{formatPrice(record.price)}</div>

                    {record.sale_price && (
                        <div style={{ color: "red" }}>
                            {formatPrice(record.sale_price)}
                        </div>
                    )}
                </>
            )
        },
        {
            title: 'Trạng thái',
            dataIndex: 'is_active',
            width: 120,
            render: (is_active: boolean) =>
                is_active === true ? (
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
                    <Link href={`/dashboard/product/edit/${record.id}`}>
                        <Button icon={<EditOutlined />} size="small" />
                    </Link>
                    <Popconfirm
                        title="Xóa sản phẩm này?"
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
                rowKey="id"
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