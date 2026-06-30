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
    Upload,
    Image,
} from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';

interface Category {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    productCount?: number;
    status: 'active' | 'hidden';
}

const beforeUploadImage = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
        message.error('Chỉ chấp nhận file ảnh!');
        return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Ảnh phải nhỏ hơn 2MB!');
        return Upload.LIST_IGNORE;
    }
    return false;
};

const slugify = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

const CategoryPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/admin/category');
            const data = await res.json();
            setCategories(data.items ?? data);
        } catch {
            message.error('Không tải được danh sách danh mục');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const openAddModal = () => {
        setEditingCategory(null);
        form.resetFields();
        setFileList([]);
        setModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setEditingCategory(category);
        form.setFieldsValue({
            name: category.name,
            description: category.description,
        });
        setFileList(
            category.image
                ? [{ uid: '1', name: 'image', status: 'done', url: category.image }]
                : []
        );
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/category/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error();
            message.success('Đã xóa danh mục');
            setCategories((prev) => prev.filter((c) => c._id !== id));
        } catch {
            message.error('Xóa thất bại. Danh mục có thể đang được sử dụng bởi sản phẩm.');
        }
    };

    const handleSubmit = async (values: { name: string; description?: string }) => {
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('slug', slugify(values.name));
            formData.append('description', values.description ?? '');

            const newFile = fileList.find((f) => f.originFileObj);
            if (newFile?.originFileObj) {
                formData.append('image', newFile.originFileObj as RcFile);
            } else if (fileList[0]?.url) {
                formData.append('existingImage', fileList[0].url);
            }

            const url = editingCategory
                ? `/api/admin/category/${editingCategory._id}`
                : '/api/admin/category';
            const method = editingCategory ? 'PUT' : 'POST';

            const res = await fetch(url, { method, body: formData });
            if (!res.ok) throw new Error();

            message.success(editingCategory ? 'Cập nhật danh mục thành công' : 'Thêm danh mục thành công');
            setModalOpen(false);
            fetchCategories();
        } catch {
            message.error('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setSubmitting(false);
        }
    };

    const columns: ColumnsType<Category> = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            width: 70,
            render: (image: string) => (
                <Image
                    src={image}
                    alt="category"
                    width={48}
                    height={48}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    fallback="/images/no-image.png"
                />
            ),
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            render: (name: string, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>/{record.slug}</div>
                </div>
            ),
        },
        {
            title: 'Số sản phẩm',
            dataIndex: 'productCount',
            width: 130,
            render: (count: number) => <Tag color="blue">{count ?? 0} sản phẩm</Tag>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            width: 120,
            render: (status: string) =>
                status === 'active' ? (
                    <Tag color="green">Hiển thị</Tag>
                ) : (
                    <Tag color="default">Đã ẩn</Tag>
                ),
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
                        title="Xóa danh mục này?"
                        description="Sản phẩm thuộc danh mục này sẽ không bị xóa nhưng mất liên kết."
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

    const filteredCategories = categories.filter((c) =>
        c.name.toLowerCase().includes(searchText.toLowerCase())
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
                <h2 style={{ margin: 0 }}>Quản lý danh mục</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
                    Thêm danh mục
                </Button>
            </div>

            <Input
                placeholder="Tìm kiếm theo tên danh mục..."
                prefix={<SearchOutlined />}
                style={{ marginBottom: 16, maxWidth: 320 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <Table
                rowKey="_id"
                columns={columns}
                dataSource={filteredCategories}
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={editingCategory ? 'Sửa danh mục' : 'Thêm danh mục mới'}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Tên danh mục"
                        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục' }]}
                    >
                        <Input placeholder="Đàn dây, Bộ gõ, Nhạc cụ hơi..." />
                    </Form.Item>

                    <Form.Item name="description" label="Mô tả ngắn">
                        <Input.TextArea rows={3} placeholder="Mô tả ngắn về danh mục này" />
                    </Form.Item>

                    <Form.Item label="Ảnh đại diện danh mục">
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={beforeUploadImage}
                            onChange={({ fileList: newList }) => setFileList(newList.slice(-1))}
                            maxCount={1}
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item style={{ marginTop: 24, marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setModalOpen(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                {editingCategory ? 'Cập nhật' : 'Thêm danh mục'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryPage;