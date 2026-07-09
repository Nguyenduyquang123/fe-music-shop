export interface BlogCategory {
    id: number
    name: string
    slug: string
    description?: string
    image?: string
    is_active: boolean
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
    created_at: string
}

export interface Blog {
    id: number
    blog_category_id: number
    user_id: number
    title: string
    slug: string
    excerpt?: string
    content: string
    thumbnail?: string
    is_published: boolean
    published_at?: string
    view_count: number
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
    created_at: string
    blog_category?: BlogCategory
    user?: { id: number; full_name: string }
}

export interface BlogFormValues {
    blog_category_id: number
    title: string
    excerpt?: string
    content: string
    is_published: boolean
    meta_title?: string
    meta_description?: string
    meta_keywords?: string
}
export interface BlogQuery {
    page?: number
    keyword?: string
    category_id?: number
    is_published?: boolean
}