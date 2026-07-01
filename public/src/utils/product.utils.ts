import type { Product } from '@/public/src/types/type'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'

export const toNumber = (value: string | number | null | undefined): number => {
    if (value === null || value === undefined) return 0
    return typeof value === 'string' ? parseFloat(value) : value
}

export const toImageUrl = (path: string | null | undefined): string => {
    if (!path) return '/images/no-image.png'
    if (path.startsWith('http')) return path
    return `${BASE_URL}/storage/${path}`
}

// Normalize 1 product từ API response về shape chuẩn dùng trong UI
export const normalizeProduct = (raw: any): Product => ({
    ...raw,
    price: toNumber(raw.price),
    sale_price: raw.sale_price ? toNumber(raw.sale_price) : null,
    thumbnail: toImageUrl(raw.thumbnail),
    images: (raw.images ?? []).map((img: any) => ({
        id: img.id,
        image_url: img.image_url.startsWith('http')
            ? img.image_url
            : `${BASE_URL}/storage/${img.image_url}`,
    })),
})

export const normalizeProducts = (products: any[]): Product[] => {
  return products.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.slug,
    price: Number(item.price),
    sale_price: item.sale_price ? Number(item.sale_price) : null,
    thumbnail: item.thumbnail,
    stock: item.stock,
    sku: item.sku,

    brand: item.brand,
    category: item.category,

    images: item.images ?? [],
    specifications: item.specifications ?? [],

    short_description: item.short_description,
    description: item.description,
  }));
};