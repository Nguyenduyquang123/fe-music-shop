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
  Skeleton,
  Tag, Switch,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import type { UploadFile, RcFile, UploadProps } from 'antd/es/upload/interface';
import { productService } from '@/public/src/services/product.service';
import {Product} from '@/public/src/types/type'

interface ProductFormValues {
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
  is_active: boolean; 
}
const { TextArea } = Input;

const priceFormatter = (value?: number | string) =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const priceParser = (value?: string) => value?.replace(/,/g, '') as any;

const beforeUploadImage = (file: RcFile) => {
  if (!file.type.startsWith('image/')) {
    message.error('Chỉ chấp nhận file ảnh!');
    return Upload.LIST_IGNORE;
  }
  if (file.size / 1024 / 1024 > 5) {
    message.error('Mỗi ảnh phải nhỏ hơn 5MB!');
    return Upload.LIST_IGNORE;
  }
  return false;
};

interface Brand { id: number; name: string }
interface Category { id: number; name: string }

const ProductEditPage = () => {
  const [form] = Form.useForm<ProductFormValues>();
  const router = useRouter();
  const params = useParams();
  const productId = Number(params?.id);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [thumbnailList, setThumbnailList] = useState<UploadFile[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [productName, setProductName] = useState('');


  useEffect(() => {
    const fetchSelects = async () => {
      try {
        const [brandData, categoryData] = (await Promise.all([
          productService.getBrands(),
          productService.getCategories(),
        ])) as [any, any];
        setBrands(brandData.data ?? brandData.items ?? brandData);
        setCategories(categoryData.data ?? categoryData.items ?? categoryData);
      } catch {
        message.error('Không tải được danh sách thương hiệu / danh mục');
      }
    };
    fetchSelects();
  }, []);

  
  useEffect(() => {
    if (!productId) return;
    const fetchProduct = async () => {
      try {
        const res = await productService.getProduct(productId) as {data:Product};
        const data = res.data ?? res;

        setProductName(data.name);

        form.setFieldsValue({
          name: data.name,
          sku: data.sku,
          price: data.price,
          sale_price: data.sale_price ?? undefined,
          stock: data.stock,
          brand_id: data.brand.id,
          category_id: data.category.id,
          short_description: data.short_description,
          description: data.description,
          specifications: Array.isArray(data.specifications)
            ? data.specifications
            : [],
            is_active: data.is_active === 1 || data.is_active === true,

        });

        // Gallery images
        setFileList(
          (data.images ?? []).map((image: any) => ({
            uid: String(image.id),
            name: `image-${image.id}`,
            status: 'done' as const,
            url: image.image_url,
          }))
        );

        // Thumbnail
        if (data.thumbnail) {
          setThumbnailList([{
            uid: 'existing-thumbnail',
            name: 'thumbnail',
            status: 'done' as const,
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${data.thumbnail}`,
          }]);
        }
      } catch {
        message.error('Không tải được dữ liệu sản phẩm');
        router.push('/dashboard/product');
      } finally {
        setLoadingData(false);
      }
    };
    fetchProduct();
  }, [productId, form, router]);

  const handleSubmit = async (values: ProductFormValues) => {
    setSubmitting(true);
    try {
      const formData = new FormData();

      formData.append('name', values.name);
      formData.append('price', String(values.price));
      formData.append('brand_id', String(values.brand_id));
      formData.append('category_id', String(values.category_id));
      formData.append('short_description', values.short_description || '');
      formData.append('description', values.description || '');
      formData.append('is_active', values.is_active ? '1' : '0');

      if (values.sku) {
        formData.append('sku', values.sku);
      }
      if (values.sale_price !== undefined && values.sale_price !== null) {
        formData.append('sale_price', String(values.sale_price));
      }
      if (values.stock !== undefined && values.stock !== null) {
        formData.append('stock', String(values.stock));
      }

      const newThumb = thumbnailList.find((f) => f.originFileObj);
      if (newThumb?.originFileObj) {
        formData.append('thumbnail', newThumb.originFileObj as RcFile);
      }

      const newImages = fileList.filter((f) => f.originFileObj);
      if (newImages.length > 0) {
        newImages.forEach((file) => {
          if (file.originFileObj) {
            formData.append('images[]', file.originFileObj as RcFile);
          }
        });
      }

      values.specifications?.forEach((spec, index) => {
        formData.append(`specifications[${index}][name]`, spec.name);
        formData.append(`specifications[${index}][value]`, spec.value);
      });

      await productService.updateProduct(productId, formData);
      message.success('Cập nhật sản phẩm thành công');
      router.push('/dashboard/product');
    } catch (err: any) {
      const errMsg = err?.response?.data?.message ?? err?.message ?? 'Cập nhật thất bại';
      message.error(errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  // Validate sale_price < price trước khi submit
  const handleFinish = (values: ProductFormValues) => {
    if (values.sale_price && values.sale_price >= values.price) {
      form.setFields([{
        name: 'sale_price',
        errors: ['Giá khuyến mãi phải nhỏ hơn giá gốc'],
      }]);
      return;
    }
    handleSubmit(values);
  };

  if (loadingData) {
    return (
      <div style={{ padding: 24, maxWidth: 1080, margin: '0 auto' }}>
        <Skeleton active paragraph={{ rows: 2 }} style={{ marginBottom: 24 }} />
        <Row gutter={24}>
          <Col xs={24} md={15}>
            <Skeleton active paragraph={{ rows: 10 }} />
          </Col>
          <Col xs={24} md={9}>
            <Skeleton active paragraph={{ rows: 8 }} />
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <div style={{ padding: 24, maxWidth: 1080, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => router.push('/dashboard/product')}
        />
        <div>
          <h2 style={{ margin: 0 }}>Sửa sản phẩm</h2>
          <div style={{ fontSize: 13, color: '#8c8c8c', marginTop: 2 }}>
            {productName} <Tag style={{ marginLeft: 4 }}>ID: {productId}</Tag>
          </div>
        </div>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        scrollToFirstError
      >
        <Row gutter={24}>
          {/* ===== CỘT TRÁI ===== */}
          <Col xs={24} md={15}>

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
                />
              </Form.Item>

              <Form.Item
                name="description"
                label="Mô tả chi tiết"
                rules={[{ required: true, message: 'Vui lòng nhập mô tả chi tiết' }]}
              >
                <TextArea rows={8} />
              </Form.Item>
            </Card>
          </Col>

          {/* ===== CỘT PHẢI ===== */}
          <Col xs={24} md={9}>

            <Card title="Ảnh đại diện (Thumbnail)" style={{ marginBottom: 16 }}>
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
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                )}
              </Upload>
              <p style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                Ảnh hiển thị ở danh sách. Nên dùng ảnh vuông.
              </p>
            </Card>

            <Card title="Ảnh gallery" style={{ marginBottom: 16 }}>
              <Upload
                listType="picture-card"
                fileList={fileList}
                beforeUpload={beforeUploadImage}
                onChange={({ fileList: newList }) => setFileList(newList)}
                multiple
              >
                {fileList.length >= 8 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Tải ảnh</div>
                  </div>
                )}
              </Upload>
              <p style={{ fontSize: 12, color: '#8c8c8c', marginTop: 4 }}>
                Tối đa 8 ảnh · mỗi ảnh dưới 5MB
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
                          name={[name, 'name']}
                          rules={[{ required: true, message: 'Nhập tên' }]}
                        >
                          <Input
                            placeholder="Chất liệu"
                            style={{ width: 118 }}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'value']}
                          rules={[{ required: true, message: 'Nhập giá trị' }]}
                        >
                          <Input
                            placeholder="Gỗ Mahogany"
                            style={{ width: 118 }}
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
                      onClick={() => add({ name: '', value: '' })}
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
        </Row><Form.Item
          name="is_active"
          label="Trạng thái hiển thị"
          valuePropName="checked"
        >
          <Switch
            checkedChildren="Đang bán"
            unCheckedChildren="Đã ẩn"
          />
        </Form.Item>

        <Divider />

        <Form.Item>
          <Space>
            <Button
              type="primary"
              htmlType="submit"
              loading={submitting}
              size="large"
            >
              Cập nhật sản phẩm
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

export default ProductEditPage;