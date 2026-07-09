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
    Divider,
} from 'antd';
import {
    PlusOutlined,
    MinusCircleOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';
import type { UploadFile, RcFile, UploadProps } from 'antd/es/upload/interface';
import { productService } from '@/public/src/services/product.service';
import {Brand,Category,Product} from '@/public/src/types/type'

const { TextArea } = Input;



export interface ProductFormValues {
    name: string;
    price: number;
    brand_id: number | string;
    category_id: number | string;
    short_description: string;
    description: string;
    images: File[];
    specifications: { name: string; value: string }[];
    thumbnail?: File;
    stock?: number;
    sku?: string;
    sale_price?: number;
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
    return false;
};

const priceFormatter = (value?: number | string) =>
    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const priceParser = (value?: string) => value?.replace(/,/g, '') as any;

const ProductFormPage = () => {
    const [form] = Form.useForm<ProductFormValues>();
    const router = useRouter();
    const params = useParams();
    const productId = params?.id as string | undefined;

    const [brands, setBrands] = useState<Brand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
    const [submitting, setSubmitting] = useState(false);
    const [loadingData, setLoadingData] = useState(!!productId);

    // Load brands + categories song song
    useEffect(() => {
        const fetchSelects = async () => {
            try {
                const brandRes = await productService.getBrands() as { data: Brand[] };
                const categoryRes = await productService.getCategories() as { data: Category[] };
                setBrands(brandRes.data);
                setCategories(categoryRes.data);
                setLoadingData(false);


            } catch {
                message.error('Không tải được dữ liệu thương hiệu / danh mục');
            }
        };
        fetchSelects();
    }, []);

    // Load sản phẩm cũ khi sửa
    useEffect(() => {
        if (!productId) return;
        const fetchProduct = async () => {
            try {

                const data = await productService.getProduct(Number(productId)) as Product;


                form.setFieldsValue({
                    name: data.name,
                    sku: data.sku,
                    price: data.price,
                    sale_price: data.sale_price ?? undefined,
                    stock: data.stock,
                    brand_id: data.brand?.id,
                    category_id: data.category?.id,
                    short_description: data.short_description,
                    description: data.description,
                    specifications: data.specifications ?? [],
                });

                setFileList(
                    (data.images ?? []).map((image, index: number) => ({
                        uid: String(image.id ?? index),
                        name: `image-${image.id ?? index}`,
                        status: 'done',
                        url: image.image_url,
                    }))
                );

                if (data.thumbnail) {
                    setThumbnailList([{
                        uid: 'thumbnail',
                        name: 'thumbnail',
                        status: 'done',
                        url: data.thumbnail,
                    }]);
                }
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
            formData.append('brand_id', String(values.brand_id));
            formData.append('category_id', String(values.category_id));
            formData.append('short_description', values.short_description);
            formData.append('description', values.description);

            if (values.sku) formData.append('sku', values.sku);
            if (values.sale_price)
                formData.append('sale_price', String(values.sale_price));
            if (values.stock !== undefined)
                formData.append('stock', String(values.stock));

            const newThumb = thumbnailList.find((f) => f.originFileObj);
            if (newThumb?.originFileObj) {
                formData.append('thumbnail', newThumb.originFileObj as RcFile);
            }
            fileList.forEach((file) => {
                if (file.originFileObj) {
                    formData.append('images[]', file.originFileObj as RcFile);
                }
            });

            values.specifications?.forEach((spec, index) => {
                formData.append(`specifications[${index}][name]`, spec.name);
                formData.append(`specifications[${index}][value]`, spec.value);
            });

            if (productId) {
                await productService.updateProduct(Number(productId), formData);
            } else {
                await productService.createProduct(formData);
            }

            message.success(
                productId
                    ? 'Cập nhật sản phẩm thành công'
                    : 'Thêm sản phẩm thành công'
            );

            router.push('/dashboard/product');
        } catch (err) {
            message.error('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setSubmitting(false);
        }
    };

    if (loadingData) return <div style={{ padding: 24 }}>Đang tải dữ liệu...</div>;

    return (
        <div style={{ padding: 24, maxWidth: 1080, margin: '0 auto' }}>
            <h2 style={{ marginBottom: 24 }}>
                {productId ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
            </h2>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ specifications: [{ name: '', value: '' }] }}
            >
                <Row gutter={24}>
                    {/* ===== CỘT TRÁI ===== */}
                    <Col xs={24} md={15}>

                        {/* Thông tin cơ bản */}
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
                                    <Form.Item name="sku" label="Mã SKU">
                                        <Input placeholder="NCV-GTR-001" />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="stock" label="Số lượng tồn kho">
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={0}
                                            placeholder="0"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="brand_id"
                                        label="Thương hiệu"
                                        rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
                                    >
                                        <Select
                                            placeholder="Chọn thương hiệu"
                                            showSearch
                                            optionFilterProp="label"
                                            options={brands.map((b) => ({
                                                value: b.id,
                                                label: b.name,
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="category_id"
                                        label="Danh mục"
                                        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                                    >
                                        <Select
                                            placeholder="Chọn danh mục"
                                            showSearch
                                            optionFilterProp="label"
                                            options={categories.map((c) => ({
                                                value: c.id,
                                                label: c.name,
                                            }))}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Giá */}
                        <Card title="Giá bán" style={{ marginBottom: 16 }}>
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item
                                        name="price"
                                        label="Giá gốc (VNĐ)"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá' }]}
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={0}
                                            formatter={priceFormatter}
                                            parser={priceParser}
                                            placeholder="24,500,000"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="sale_price"
                                        label="Giá khuyến mãi (VNĐ)"
                                    >
                                        <InputNumber
                                            style={{ width: '100%' }}
                                            min={0}
                                            formatter={priceFormatter}
                                            parser={priceParser}
                                            placeholder="Để trống nếu không giảm giá"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        {/* Mô tả */}
                        <Card title="Mô tả sản phẩm" style={{ marginBottom: 16 }}>
                            <Form.Item
                                name="short_description"
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
                                name="description"
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

                    {/* ===== CỘT PHẢI ===== */}
                    <Col xs={24} md={9}>

                        {/* Thumbnail */}
                        <Card title="Ảnh đại diện" style={{ marginBottom: 16 }}>
                            <Upload
                                listType="picture-card"
                                fileList={thumbnailList}
                                beforeUpload={beforeUploadImage}
                                onChange={({ fileList: newList }) =>
                                    setThumbnailList(newList.slice(-1))
                                }
                                maxCount={1}
                            >
                                {thumbnailList.length >= 1 ? null : (
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Thumbnail</div>
                                    </div>
                                )}
                            </Upload>
                            <p style={{ fontSize: 12, color: '#8c8c8c', marginTop: 8 }}>
                                Ảnh hiển thị chính ở danh sách. Nên dùng ảnh vuông.
                            </p>
                        </Card>

                        {/* Gallery */}
                        <Card title="Ảnh gallery sản phẩm" style={{ marginBottom: 16 }}>
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
                                Tối đa 8 ảnh · mỗi ảnh dưới 5MB
                            </p>
                        </Card>

                        {/* Thông số kỹ thuật */}
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
                                                    name={[name, 'name']}
                                                    rules={[{ required: true, message: 'Nhập tên' }]}
                                                >
                                                    <Input
                                                        placeholder="Chất liệu"
                                                        style={{ width: 120 }}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    {...restField}
                                                    name={[name, 'value']}
                                                    rules={[{ required: true, message: 'Nhập giá trị' }]}
                                                >
                                                    <Input
                                                        placeholder="Gỗ Mahogany"
                                                        style={{ width: 120 }}
                                                    />
                                                </Form.Item>
                                                <MinusCircleOutlined
                                                    onClick={() => remove(name)}
                                                    style={{ color: '#ff4d4f', cursor: 'pointer' }}
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

                <Divider />

                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={submitting}
                            size="large"
                        >
                            {productId ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                        </Button>
                        <Button
                            size="large"
                            onClick={() => router.push('/dashboard/product')}
                        >
                            Hủy
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductFormPage;