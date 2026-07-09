'use client'
import { useEffect, useState } from 'react'
import { Button, Skeleton } from 'antd'
import Link from 'next/link'
import { clientProductService } from '@/public/src/services/client/product.service'
import { normalizeProducts, handleImageError, toNumber } from '@/public/src/utils/product.utils'
import type { Product } from '@/public/src/types/type'

const formatPrice = (price: number) => price.toLocaleString('vi-VN') + '₫'

const FeaturedProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await clientProductService.getProducts({ sort: 'popular', per_page: 4 } as any);

        // 1. Lấy mảng gốc
        let rawProducts = res.data ?? res.items ?? [];

        // 2. Sắp xếp theo view_count giảm dần (nếu API chưa trả về đúng thứ tự)
        const sortedProducts = [...rawProducts].sort((a, b) => {
          return (b.view_count || 0) - (a.view_count || 0);
        });

        // 3. Chuẩn hóa và lưu vào state
        setProducts(normalizeProducts(sortedProducts));
      } catch {
        // giữ rỗng
      } finally {
        setLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section className="py-24 px-margin-desktop max-w-container-max mx-auto">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-headline-lg text-headline-lg flex items-center gap-4">
          <span className="w-12 h-1 bg-primary" />
          Sản Phẩm Nổi Bật
        </h2>
        <Link href="/product" className="text-primary font-bold hover:underline">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-container-high rounded-xl p-4">
              <Skeleton.Image active style={{ width: '100%', aspectRatio: '1', borderRadius: 8 }} />
              <Skeleton active paragraph={{ rows: 2 }} style={{ marginTop: 16 }} />
            </div>
          ))
          : products.map((product) => {
            const price = toNumber(product.price)
            const salePrice = product.sale_price ? toNumber(product.sale_price) : null
            const hasDiscount = salePrice !== null && salePrice < price

            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group bg-surface-container-high rounded-xl p-4 transition-all duration-300 hover:-translate-y-2 accent-glow block"
              >
                <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-surface-container flex items-center justify-center">
                  <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-4/5 h-4/5 object-contain transition-transform group-hover:scale-110"
                    onError={handleImageError}
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-label-sm font-label-sm text-primary uppercase bg-primary/10 px-2 py-1 rounded">
                    {product.category?.name}
                  </span>
                  <h3 className="font-headline-md text-headline-md leading-snug line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center pt-1">
                    <div>
                      <span className="text-primary font-bold text-headline-md">
                        {formatPrice(hasDiscount ? salePrice! : price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-on-surface-variant text-label-sm line-through ml-2">
                          {formatPrice(price)}
                        </span>
                      )}
                    </div>
                    <Button
                      type="primary"
                      size="small"
                      className="metallic-sheen"
                      onClick={(e) => {
                        e.preventDefault()
                        // TODO: mở modal liên hệ
                      }}
                      icon={<span className="material-symbols-outlined text-sm">phone</span>}
                    />
                  </div>
                </div>
              </Link>
            )
          })}
      </div>
    </section>
  )
}

export default FeaturedProductPage