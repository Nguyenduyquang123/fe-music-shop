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
import { brandService } from '@/public/src/services/brand.service';

interface Brand {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    is_active: 1 | 0;
}



const slugify = (text: string) =>
    text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');

const BrandPage = () => {
    const [categories, setCategories] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');

    const [modalOpen, setModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [form] = Form.useForm();

    const fetchCategories = async () => {

        setLoading(true);

        try {

            const res = await brandService.getBrands();

            setCategories(res?.data);


        } catch {

            message.error("Không tải được thương hiệu");

        } finally {

            setLoading(false);

        }

    };
    useEffect(() => {
        fetchCategories();
    }, []);

    const openAddModal = () => {
        setEditingBrand(null);
        form.resetFields();
        setFileList([]);
        setModalOpen(true);
    };

    const openEditModal = async (brand: Brand) => {

        try {

            const res = await brandService.getBrand(brand.id);

            const data = res?.data;

            setEditingBrand(data);

            form.setFieldsValue({
                name: data?.name,
                description: data?.description,
                is_active: data?.is_active,
                sort_order: data?.sort_order,
            });

            setFileList(
                data.image
                    ? [
                        {
                            uid: "1",
                            name: "image",
                            status: "done",
                            url: data.image,
                        },
                    ]
                    : []
            );

            setModalOpen(true);

        } catch {

            message.error("Không lấy được thông tin thương hiệu");

        }

    };
    const handleDelete = async (id: number) => {

        try {

            await brandService.deleteBrand(id);

            message.success("Xóa thành công");

            fetchCategories();

        } catch {

            message.error("Xóa thất bại");

        }

    };

    const handleSubmit = async (values: any) => {

        setSubmitting(true);

        try {

            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("slug", slugify(values.name));
            formData.append("description", values.description || "");
            formData.append(
                "is_active",
                values.is_active ? "1" : "0"
            );
            formData.append(
                "sort_order",
                String(values.sort_order ?? 0)
            );

            const file = fileList[0]?.originFileObj;

            if (file) {
                formData.append("image", file as RcFile);
            }

            if (editingBrand) {

                await brandService.updateBrand(
                    editingBrand.id,
                    formData
                );

                message.success("Cập nhật thành công");

            } else {

                await brandService.createBrand(formData);

                message.success("Thêm thành công");

            }

            setModalOpen(false);

            fetchCategories();

        } catch {

            message.error("Có lỗi xảy ra");

        } finally {

            setSubmitting(false);

        }

    };

    const columns: ColumnsType<Brand> = [
        {
            title: 'Tên thương hiệu',
            dataIndex: 'name',
            render: (name: string, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{name}</div>
                    <div style={{ fontSize: 12, color: '#8c8c8c' }}>/{record.slug}</div>
                </div>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "is_active",
            render: (value: 1 | 0) =>
                value === 0 ? (
                    <Tag color="green">Hiển thị</Tag>
                ) : (
                    <Tag color="red">Ẩn</Tag>
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
                        title="Xóa thương hiệu này?"
                        description="Sản phẩm thuộc thương hiệu này sẽ không bị xóa nhưng mất liên kết."
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
                <h2 style={{ margin: 0 }}>Quản lý thương hiệu</h2>
                <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
                    Thêm thương hiệu
                </Button>
            </div>

            <Input
                placeholder="Tìm kiếm theo tên thương hiệu..."
                prefix={<SearchOutlined />}
                style={{ marginBottom: 16, maxWidth: 320 }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                allowClear
            />

            <Table
                rowKey="id"
                columns={columns}
                dataSource={filteredCategories}
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={editingBrand ? 'Sửa thương hiệu' : 'Thêm thương hiệu mới'}
                open={modalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="name"
                        label="Tên thương hiệu"
                        rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}
                    >
                        <Input placeholder="yamaha, Casio..." />
                    </Form.Item>

                    <Form.Item name="description" label="Mô tả ngắn">
                        <Input.TextArea rows={3} placeholder="Mô tả ngắn về thương hiệu này" />
                    </Form.Item>

                 

                    <Form.Item style={{ marginTop: 24, marginBottom: 0, textAlign: 'right' }}>
                        <Space>
                            <Button onClick={() => setModalOpen(false)}>Hủy</Button>
                            <Button type="primary" htmlType="submit" loading={submitting}>
                                {editingBrand ? 'Cập nhật' : 'Thêm thương hiệu'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BrandPage;