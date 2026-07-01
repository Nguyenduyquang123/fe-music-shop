import Link from 'next/link'
import type { Product } from '@/public/src/types/type'
import { toNumber } from '@/public/src/utils/product.utils'
const formatPrice = (price: number) =>
  price.toLocaleString('vi-VN') + '₫'

const BADGE_MAP = {
  hot: {
    cls: 'bg-primary-container text-on-primary-container',
    label: 'Bán chạy',
  },
  new: {
    cls: 'bg-secondary-container text-on-secondary-container border border-outline-variant/30',
    label: 'Mới',
  },
} as const

interface Props {
  products: Product[]
  loading: boolean
}

const SkeletonCard = () => (
  <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 flex flex-col animate-pulse">
    <div className="aspect-square bg-surface-container-high" />
    <div className="p-6 space-y-3">
      <div className="h-3 bg-surface-container-high rounded w-1/3" />
      <div className="h-5 bg-surface-container-high rounded w-3/4" />
      <div className="h-5 bg-surface-container-high rounded w-1/2 mt-4" />
    </div>
  </div>
)

const ProductGrid = ({ products, loading }: Props) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">
          search_off
        </span>
        <p className="font-headline-md text-headline-md text-on-surface mb-2">
          Không tìm thấy sản phẩm
        </p>
        <p className="text-body-md text-on-surface-variant">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {products.map((product) => {
        const badge = product.badge ? BADGE_MAP[product.badge] : null
        const price = toNumber(product.price)
        const salePrice = product.sale_price ? toNumber(product.sale_price) : null
        const hasDiscount = salePrice !== null && salePrice < price
        const displayPrice = hasDiscount ? salePrice! : price
        const discountPercent = hasDiscount
          ? Math.round((1 - salePrice! / price) * 100)
          : 0

        return (
          <Link
            key={product.id}
            href={`/product/${product.slug}-${product.id}`}
            className="group bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/10 product-card-glow flex flex-col"
          >
            <div className="relative aspect-square overflow-hidden bg-[#1E1E1E]">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${product.thumbnail}`}
                alt={product.name}
                className="w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
              />
              {badge && (
                <span className={`absolute top-4 left-4 text-label-sm font-label-sm px-3 py-1 rounded-full shadow-lg ${badge.cls}`}>
                  {badge.label}
                </span>
              )}
              {hasDiscount && (
                <span className="absolute top-4 right-4 bg-error text-on-error text-label-sm font-bold px-2 py-1 rounded-full shadow-lg">
                  -{discountPercent}%
                </span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-1">
              <span className="text-label-sm text-on-surface-variant uppercase mb-2">
                {product.category.name}
              </span>
              <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors line-clamp-2">
                {product.name}
              </h3>
              <div className="mt-auto flex justify-between items-center">
                <div className="flex items-baseline gap-2">
                  <span className="text-primary font-headline-md text-headline-md">
                    {formatPrice(displayPrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-on-surface-variant text-label-sm line-through">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                {product.rating != null && (
                  <div className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="text-label-sm">{product.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default ProductGrid