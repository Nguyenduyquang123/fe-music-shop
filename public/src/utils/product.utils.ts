import type { Product } from '@/public/src/types/type'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'

export const toNumber = (value: string | number | null | undefined): number => {
    if (value === null || value === undefined) return 0
    return typeof value === 'string' ? parseFloat(value) : value
}

export const toImageUrl = (path: string | null | undefined): string => {
    if (!path) return 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjQiIGZpbGw9IiNkOWQ5ZDkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj7wn5K3PC90ZXh0Pjwvc3ZnPg=='
    if (path.startsWith('http')) return path
    return `${BASE_URL}/storage/${path}`
}


export const normalizeProduct = (raw: any): Product => ({
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    sku: raw.sku,
    stock: raw.stock,
    short_description: raw.short_description,
    description: raw.description,
    is_active: raw.is_active,
    is_featured: raw.is_featured,
    view_count: raw.view_count,
    badge: raw.badge ?? null,
    rating: raw.rating ?? null,
    brand: raw.brand,
    category: raw.category,
    price: toNumber(raw.price),
    sale_price: raw.sale_price ? toNumber(raw.sale_price) : null,
    thumbnail: toImageUrl(raw.thumbnail),
    images: (raw.images ?? []).map((img: any) => ({
        id: img.id,
        image_url: toImageUrl(img.image_url),
    })),
    specifications: (raw.specifications ?? []).map((s: any) => ({
        id: s.id,
        name: s.name,
        value: s.value,
    })),
})

export const normalizeProducts = (list: any[]): Product[] =>
    list.map(normalizeProduct)

export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null
    e.currentTarget.src = toImageUrl(null) // trả về placeholder
}