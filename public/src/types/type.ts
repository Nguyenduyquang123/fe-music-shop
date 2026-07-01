
export interface Product {
    id: number;
    name: string;
    sku: string;
     price: number        // API trả về string
    sale_price?: number
    stock: number;
    brand: Brand;
    category: Category;
    short_description: string;
    description: string;
    images: string[];
    thumbnail: string;
    specifications: { name: string; value: string }[];
    is_active?: boolean | number;
}

export interface profile{
    id: number;
    full_name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface Brand {
    id: number;
    name: string;
    slug: string;
    logo: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface User {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    role: string;
    avatar: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    deleted_at: string;
}

export interface CategoryOption { id: number; name: string }
export interface BrandOption { id: number; name: string }

export interface ProductQuery {
    page?: number
    keyword?: string
    category_id?: number
    brand_id?: number
    min_price?: number
    max_price?: number
    sort?: string
}

export interface FilterState {
    categoryId: number | null
    brandId: number | null
    minPrice: number | null
    maxPrice: number | null
}

export interface PriceRange {
    label: string
    min: number
    max: number | null
}

// ============ API RESPONSE ============

export interface PaginationMeta {
    current_page: number
    last_page: number
    per_page: number
    total: number
}

export interface PaginatedResponse<T> {
    data: T[]
    links?: {
        first: string | null
        last: string | null
        prev: string | null
        next: string | null
    }
    meta: {
        current_page: number
        last_page: number
        per_page: number
        total: number
        from: number
        to: number
    }
}
