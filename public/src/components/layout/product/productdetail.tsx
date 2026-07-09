'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
  Breadcrumb, Button, Modal, Form, Input,
  message, Skeleton, Tag, Divider,
} from 'antd'
import {
  PhoneOutlined, MessageOutlined,
  EnvironmentOutlined, SafetyCertificateOutlined,
} from '@ant-design/icons'
import Link from 'next/link'
import { clientProductService } from '@/public/src/services/client/product.service'
import {
  normalizeProduct,
  normalizeProducts,
  handleImageError,
  toNumber,
} from '@/public/src/utils/product.utils'
import type { Product } from '@/public/src/types/type'
import { inquiryService } from "@/public/src/services/client/inquiry.service";
import type { InquiryPayload } from "@/public/src/types/inquiry.type";
const formatPrice = (price: number) => price.toLocaleString('vi-VN') + '₫'


interface ContactFormValues {
  full_name: string
  phone: string
  note?: string
}

const ProductDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const slug = params?.id as string;
  const productId = slug ? Number(slug.split('-').pop()) : null;



  if (!productId || isNaN(productId)) {
    return <div>Sản phẩm không tồn tại hoặc URL không hợp lệ.</div>;
  }

  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form] = Form.useForm<ContactFormValues>()

  useEffect(() => {
    if (!productId) return;
    let ignore = false; // Biến cờ

    const fetchData = async () => {
      setLoading(true);
      try {
        const [productRes, relatedRes] = await Promise.all([
          clientProductService.getProduct(productId),
          clientProductService.getRelatedProducts(productId),
        ]);

        if (!ignore) { // Chỉ cập nhật state nếu chưa bị huỷ
          const normalized = normalizeProduct(productRes.data ?? productRes);
          setProduct(normalized);
          setActiveImage(normalized.images?.[0]?.image_url ?? normalized.thumbnail);
          setRelated(normalizeProducts(relatedRes.data ?? relatedRes.items ?? []));
          setLoading(false);
        }
      } catch {
        if (!ignore) {
          message.error('Không tải được thông tin sản phẩm');
          router.push('/product');
        }
      }
    };

    fetchData();
    return () => { ignore = true; };
  }, [productId]);

  const handleContactSubmit = async (
    values: Omit<InquiryPayload, "product_id">
  ) => {

    setSubmitting(true);

    try {

      await inquiryService.create({

        product_id: productId,

        full_name: values.full_name,

        phone: values.phone,

        note: values.note,

      });

      message.success("Cảm ơn bạn! Chúng tôi sẽ liên hệ lại sớm nhất.");

      form.resetFields();

      setModalOpen(false);

    } catch (error) {

      message.error("Có lỗi xảy ra, vui lòng thử lại.");

    } finally {

      setSubmitting(false);

    }

  };

  if (loading) {
    return (
      <main className="pt-24 pb-20 max-w-container-max mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <div className="md:col-span-7">
            <Skeleton.Image active style={{ width: '100%', height: 480, borderRadius: 12 }} />
            <div className="grid grid-cols-4 gap-4 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton.Image key={i} active style={{ width: '100%', height: 80, borderRadius: 8 }} />
              ))}
            </div>
          </div>
          <div className="md:col-span-5">
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        </div>
      </main>
    )
  }

  if (!product) return null

  const price = toNumber(product.price)
  const salePrice = product.sale_price ? toNumber(product.sale_price) : null
  const hasDiscount = salePrice !== null && salePrice > 0 && salePrice < price
  const discountPercent = hasDiscount
    ? Math.round((1 - salePrice! / price) * 100)
    : 0
  const galleryImages =
    product.images && product.images.length > 0
      ? product.images.map((img) => img.image_url)
      : [product.thumbnail]

  return (
    <main className="pt-24 pb-20">
      {/* ===== PRODUCT SECTION ===== */}
      <section className="max-w-container-max mx-auto px-margin-desktop grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">

        {/* Ảnh */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[4/5] bg-surface-container rounded-xl overflow-hidden">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-contain p-6 transition-all duration-300"
              onError={handleImageError}
            />
            {hasDiscount && (
              <span className="absolute top-4 left-4 bg-error text-on-error text-label-sm font-bold px-3 py-1 rounded-full shadow-lg">
                -{discountPercent}%
              </span>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="grid grid-cols-5 gap-3">
              {galleryImages.map((url, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImage(url)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${activeImage === url
                    ? 'border-primary'
                    : 'border-outline-variant/30 hover:border-primary/50'
                    }`}
                >
                  <img
                    src={url}
                    alt={`${product.name} ${i + 1}`}
                    className="w-full h-full object-contain p-1"
                    onError={handleImageError}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Thông tin */}
        <div className="md:col-span-5 flex flex-col gap-5 sticky top-28">
          <Breadcrumb
            items={[
              { title: <Link href="/">Trang chủ</Link> },
              { title: <Link href="/product">Sản phẩm</Link> },
              { title: product.category?.name },
            ]}
          />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag color="blue">{product.brand?.name}</Tag>
              <Tag color="default">{product.category?.name}</Tag>
              {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
                <Tag color="warning">Còn {product.stock} cái</Tag>
              )}
              {product.stock === 0 && <Tag color="error">Hết hàng</Tag>}
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
              {product.name}
            </h1>
            {product.sku && (
              <p className="text-label-sm text-on-surface-variant mt-1">SKU: {product.sku}</p>
            )}
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-display-lg font-display-lg text-primary">
              {formatPrice(hasDiscount ? salePrice! : price)}
            </span>
            {hasDiscount && (
              <span className="text-headline-md text-on-surface-variant line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>

          {product.short_description && (
            <p className="text-body-md text-on-surface-variant leading-relaxed">
              {product.short_description}
            </p>
          )}

          {product.specifications && product.specifications.length > 0 && (
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-surface-container-high border border-outline-variant/30">
              {product.specifications.slice(0, 4).map((spec, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <span className="text-label-sm font-semibold text-on-surface-variant uppercase tracking-wider">
                    {spec.name}
                  </span>
                  <span className=" text-on-surface text-body-md">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3 mt-2">
            <Button
              type="primary"
              size="large"
              block
              icon={<PhoneOutlined />}
              onClick={() => setModalOpen(true)}
              style={{ height: 52, fontSize: 16, fontWeight: 700 }}
            >
              Để lại thông tin tư vấn
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <a href={process.env.NEXT_PUBLIC_ZALO_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="large" block icon={<MessageOutlined />}
                  style={{ height: 48, fontWeight: 600, borderColor: '#0068ff', color: '#0068ff' }}>
                  Zalo
                </Button>
              </a>
              <a href={process.env.NEXT_PUBLIC_FACEBOOK_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="large" block icon={<MessageOutlined />}
                  style={{ height: 48, fontWeight: 600, borderColor: '#1877f2', color: '#1877f2' }}>
                  Facebook
                </Button>
              </a>
            </div>
          </div>

          <Divider style={{ margin: '8px 0' }} />
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <EnvironmentOutlined />, text: 'Giao hàng toàn quốc' },
              { icon: <SafetyCertificateOutlined />, text: 'Bảo hành 24 tháng' },
              { icon: <PhoneOutlined />, text: 'Hỗ trợ 8:00 - 21:00' },
              { icon: <SafetyCertificateOutlined />, text: 'Sản phẩm chính hãng' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-label-sm text-on-surface-variant">
                <span className="text-primary">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MÔ TẢ CHI TIẾT ===== */}
      {product.description && (
        <section className="max-w-[760px] mx-auto px-margin-mobile mt-24">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-l-4 border-primary pl-4">
            Mô tả chi tiết
          </h2>
          <div
            className="prose prose-invert max-w-none text-on-surface-variant leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </section>
      )}

      {/* ===== THÔNG SỐ ĐẦY ĐỦ ===== */}
      {product.specifications && product.specifications.length > 0 && (
        <section className="max-w-[760px] mx-auto px-margin-mobile mt-16">
          <h2 className="font-headline-lg text-headline-lg text-primary mb-8 border-l-4 border-primary pl-4">
            Thông số kỹ thuật
          </h2>
          <div className="rounded-xl overflow-hidden border border-outline-variant/20">
            {product.specifications.map((spec, i) => (
              <div
                key={i}
                className={`flex justify-between px-6 py-4 text-body-md ${i % 2 === 0 ? 'bg-surface-container' : 'bg-surface-container-low'
                  }`}
              >
                <span className="font-semibold text-on-surface-variant w-2/5">{spec.name}</span>
                <span className=" text-on-surface w-3/5 text-right">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===== SẢN PHẨM LIÊN QUAN ===== */}
      {related.length > 0 && (
        <section className="max-w-container-max mx-auto px-margin-desktop mt-24">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-primary text-label-sm font-bold uppercase tracking-widest">Gợi ý</span>
              <h2 className="font-headline-lg text-headline-lg">Sản phẩm liên quan</h2>
            </div>
            <Link href="/product"
              className="text-primary font-bold hover:underline flex items-center gap-1 text-label-sm">
              Xem tất cả
              <span className="material-symbols-outlined text-[18px]">arrow_right_alt</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {related.map((item) => {
              const p = toNumber(item.price)
              const sp = item.sale_price ? toNumber(item.sale_price) : null
              const disc = sp && sp < p
              return (
                <Link key={item.id} href={`/product/${item.id}`}
                  className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 hover:border-primary/40 transition-all duration-300">
                  <div className="aspect-[4/5] overflow-hidden bg-surface-container">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      onError={handleImageError}
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[10px] text-primary bg-primary/10 px-2 py-1 rounded uppercase font-bold">
                      {item.category?.name}
                    </span>
                    <h3 className="mt-2 font-bold text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2 mt-2">
                      <span className="text-primary font-headline-md">
                        {formatPrice(disc ? sp! : p)}
                      </span>
                      {disc && (
                        <span className="text-on-surface-variant text-label-sm line-through">
                          {formatPrice(p)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* ===== MODAL LIÊN HỆ ===== */}
      <Modal
        title={
          <div>
            <p className="font-bold text-lg">Để lại thông tin tư vấn</p>
            <p className="text-sm font-normal text-on-surface-variant mt-1">
              Chúng tôi sẽ liên hệ lại trong vòng 30 phút (8:00 - 21:00)
            </p>
          </div>
        }
        open={modalOpen}
        onCancel={() => { setModalOpen(false); form.resetFields() }}
        footer={null}
        destroyOnClose
      >
        <div className="mb-4 p-3 bg-surface-container rounded-lg border border-outline-variant/30">
          <p className="text-label-sm text-on-surface-variant">Sản phẩm quan tâm:</p>
          <p className="font-semibold text-on-surface mt-1">{product.name}</p>
          <p className="text-primary font-bold">
            {formatPrice(hasDiscount ? salePrice! : price)}
          </p>
        </div>

        <Form form={form} layout="vertical" onFinish={handleContactSubmit}>
          <Form.Item
            name="full_name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input placeholder="Nguyễn Văn A" size="large" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Số điện thoại"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { pattern: /^(0|\+84)[0-9]{9,10}$/, message: 'Số điện thoại không hợp lệ' },
            ]}
          >
            <Input placeholder="0901234567" size="large" prefix={<PhoneOutlined />} />
          </Form.Item>
          <Form.Item name="note" label="Ghi chú (tùy chọn)">
            <Input.TextArea rows={3} placeholder="Thời gian có thể liên hệ, câu hỏi thêm..." />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="primary" htmlType="submit" block size="large"
              loading={submitting} icon={<PhoneOutlined />}>
              Gửi thông tin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </main>
  )
}

export default ProductDetailPage