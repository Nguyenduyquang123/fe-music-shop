import type { Product } from './type'

export interface RecentInquiry {
    id: number
    product_id: number
    full_name: string
    phone: string
    note: string | null
    status: 'pending' | 'contacted' | 'done'
    created_at: string
    updated_at: string
    product: Pick<Product, 'id' | 'name' | 'thumbnail' | 'slug'>
}

export interface TopProduct {
    id: number
    name: string
    thumbnail: string
    view_count: number
    inquiries_count: number
    price: string | number
    sale_price: string | number | null
}

export interface DashboardData {
    total_products: number
    new_inquiries: number
    total_inquiries: number
    total_views: number | string
    recent_inquiries: RecentInquiry[]
    top_products: TopProduct[]
}