'use client'
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Upload,
    Card,
    Row,
    Col,
    Space,
    message,
    Image,
} from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile, RcFile, UploadProps } from 'antd/es/upload/interface';

const { TextArea } = Input;

interface Brand {
    _id: string;
    name: string;
}

interface ProductFormValues {
    name: string;
    price: number;
    brandId: string;
    shortDescription: string;
    detailDescription: string;
    specifications: { key: string; value: string }[];
}

const beforeUploadImage = (file: RcFile) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
        message.error('Chỉ chấp nhận file ảnh!');
        return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Mỗi ảnh phải nhỏ hơn 5MB!');
        return Upload.LIST_IGNORE;
    }
    return false; // không upload tự động, lấy file để xử lý lúc submit
};

const ProductFormPage = () => {
    const [form] = Form.useForm<ProductFormValues>();
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string | undefined; // có id => đang sửa

    const [brands, setBrands] = useState<Brand[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [loadingData, setLoadingData] = useState(!!productId);

    // Load danh sách thương hiệu cho Select
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await fetch('/api/admin/brand');
                const data = await res.json();
                setBrands(data.items ?? data);
            } catch {
                message.error('Không tải được danh sách thương hiệu');
            }
        };
        fetchBrands();
    }, []);

    // Nếu là trang sửa, load dữ liệu sản phẩm cũ
    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/admin/product/${productId}`);
                const data = await res.json();
                form.setFieldsValue({
                    name: data.name,
                    price: data.price,
                    brandId: data.brand?._id,
                    shortDescription: data.shortDescription,
                    detailDescription: data.detailDescription,
                    specifications: data.specifications ?? [],
                });
                setFileList(
                    (data.images ?? []).map((url: string, index: number) => ({
                        uid: String(index),
                        name: `image-${index}`,
                        status: 'done',
                        url,
                    }))
                );
            } catch {
                message.error('Không tải được dữ liệu sản phẩm');
            } finally {
                setLoadingData(false);
            }
        };
        fetchProduct();
    }, [productId, form]);

    const handleUploadChange: UploadProps['onChange'] = ({ fileList: newList }) => {
        setFileList(newList);
    };

    const handleSubmit = async (values: ProductFormValues) => {
        setSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('price', String(values.price));
            formData.append('brandId', values.brandId);
            formData.append('shortDescription', values.shortDescription);
            formData.append('detailDescription', values.detailDescription);
            formData.append('specifications', JSON.stringify(values.specifications ?? []));

            // Ảnh cũ (đã có url) giữ lại, ảnh mới (originFileObj) thì append để upload
            const existingUrls: string[] = [];
            fileList.forEach((file) => {
                if (file.url) {
                    existingUrls.push(file.url);
                } else if (file.originFileObj) {
                    formData.append('images', file.originFileObj as RcFile);
                }
            });
            formData.append('existingImages', JSON.stringify(existingUrls));

            const url = productId
                ? `/api/admin/product/${productId}`
                : '/api/admin/product';
            const method = productId ? 'PUT' : 'POST';

            const res = await fetch(url, { method, body: formData });
            if (!res.ok) throw new Error();

            message.success(productId ? 'Cập nhật sản phẩm thành công' : 'Thêm sản phẩm thành công');
            router.push('/dashboard/product');
        } catch {
            message.error('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingData) return <div style={{ padding: 24 }}>Đang tải dữ liệu...</div>;

    return (
        <div style={{ padding: 24, maxWidth: 960, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 24 }}>
                {productId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ specifications: [{ key: '', value: '' }] }}
            >
                <Row gutter={24}>
                    <Col xs={24} md={14}>
                        <Card title="Thông tin cơ bản" style={{ marginBottom: 16 }}>
                            <Form.Item
                                name="name"
                                label="Tên sản phẩm"
                                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                            >
                                <Input placeholder="Đàn Guitar Taylor 214ce" />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="price"
                                        label="Giá bán (VNĐ)"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={0}
                                            formatter={(value) =>
                                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                            }
                                            parser={(value) => value?.replace(/,/g, '') as any}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="brandId"
                                        label="Thương hiệu"
                                        rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
                                    >
                                        <Select
                                            placeholder="Chọn thương hiệu"
                                            options={brands.map((b) => ({
                                                value: b._id,
                                                label: b.name,
                                            }))}
                                            showSearch
                                            optionFilterProp="label"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item
                                name="shortDescription"
                                label="Mô tả ngắn"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả ngắn' }]}
                            >
                                <TextArea
                                    rows={2}
                                    maxLength={160}
                                    showCount
                                    placeholder="Mô tả ngắn gọn hiển thị ở danh sách sản phẩm"
                                />
                            </Form.Item>

                            <Form.Item
                                name="detailDescription"
                                label="Mô tả chi tiết"
                                rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết' }]}
                            >
                                <TextArea
                                    rows={8}
                                    placeholder="Mô tả chi tiết, lịch sử sản phẩm, chất liệu, công dụng..."
                                />
                            </Form.Item>
                        </Card>
                    </Col>

                    <Col xs={24} md={10}>
                        <Card title="Hình ảnh sản phẩm" style={{ marginBottom: 16 }}>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                beforeUpload={beforeUploadImage}
                                onChange={handleUploadChange}
                                multiple
                            >
                                {fileList.length >= 8 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Tải ảnh</div>
                                    </div>
                                )}
                            </Upload>
                            <p style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
                                Tối đa 8 ảnh, mỗi ảnh dưới 5MB. Ảnh đầu tiên là ảnh đại diện.
                            </p>
                        </Card>

                        <Card title="Thông số kỹ thuật">
                            <Form.List name="specifications">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Space
                                                key={key}
                                                style={{ display: 'flex', marginBottom: 8 }}
                                                align="baseline"
                                            >
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'key']}
                                                    rules={[{ required: true, message: 'Tên thông số' }]}
                                                >
                                                    <Input placeholder="Chất liệu" style={{ width: 130 }} />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'value']}
                                                    rules={[{ required: true, message: 'Giá trị' }]}
                                                >
                                                    <Input placeholder="Gỗ Mahogany" style={{ width: 130 }} />
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{ color: '#ff4d4f' }}
                                                />
                                            </Space>
                                        ))}
                                        <Button
                                            type="dashed"
                                            onClick={() => add()}
                                            icon={<PlusCircleOutlined />}
                                            block
                                        >
                                            Thêm thông số
                                        </Button>
                                    </>
                                )}
                            </Form.List>
                        </Card>
                    </Col>
                </Row>

                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" loading={submitting}>
                            {productId ? 'Cập nhật' : 'Thêm sản phẩm'}
                        </Button>
                        <Button onClick={() => router.push('/dashboard/product')}>Hủy</Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductFormPage;