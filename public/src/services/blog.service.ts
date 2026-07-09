import { sendRequest } from "@/public/src/library/api"
import { BlogFormValues } from "../types/blog.types"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'

export const toImageUrl = (path: string | null | undefined): string => {
    if (!path) return 'https://placehold.co/400x300?text=No+Image'
    if (path.startsWith('http')) return path
    return `${BASE_URL}/storage/${path}`
}

export const blogService = {
    getBlogs(params?: { page?: number; search?: string; category_id?: number; is_published?: boolean }) {
        const query = new URLSearchParams()
        if (params?.page) query.set('page', String(params.page))
        if (params?.search) query.set('search', params.search)
        if (params?.category_id) query.set('category_id', String(params.category_id))
        if (params?.is_published !== undefined) query.set('is_published', params.is_published ? '1' : '0')
        return sendRequest({ url: `/api/auth/blogs?${query}`, method: 'GET' })
    },

    getBlog(id: number) {
        return sendRequest({ url: `/api/auth/blogs/${id}`, method: 'GET' })
    },

    createBlog(formData: FormData) {
        return sendRequest({ url: '/api/auth/blogs', method: 'POST', body: formData })
    },

    updateBlog(id: number, formData: FormData) {
        formData.append('_method', 'PUT')
        return sendRequest({ url: `/api/auth/blogs/${id}`, method: 'POST', body: formData })
    },

    deleteBlog(id: number) {
        return sendRequest({ url: `/api/auth/blogs/${id}`, method: 'DELETE' })
    },

    // Categories
    getCategories() {
        return sendRequest({ url: '/api/auth/blog-categories', method: 'GET' })
    },

    createCategory(formData: FormData) {
        return sendRequest({ url: '/api/auth/blog-categories', method: 'POST', body: formData })
    },

    updateCategory(id: number, formData: FormData) {
        formData.append('_method', 'PUT')
        return sendRequest({ url: `/api/auth/blog-categories/${id}`, method: 'POST', body: formData })
    },

    deleteCategory(id: number) {
        return sendRequest({ url: `/api/auth/blog-categories/${id}`, method: 'DELETE' })
    },

    buildFormData(values: BlogFormValues, thumbnailFile?: File | null, existingThumbnail?: string): FormData {
        const fd = new FormData()
        fd.append('blog_category_id', String(values.blog_category_id))
        fd.append('title', values.title)
        fd.append('content', values.content)
        fd.append('is_published', values.is_published ? '1' : '0')
        if (values.excerpt) fd.append('excerpt', values.excerpt)
        if (values.meta_title) fd.append('meta_title', values.meta_title)
        if (values.meta_description) fd.append('meta_description', values.meta_description)
        if (values.meta_keywords) fd.append('meta_keywords', values.meta_keywords)
        if (thumbnailFile) fd.append('thumbnail', thumbnailFile)
        else if (existingThumbnail) fd.append('existing_thumbnail', existingThumbnail)
        return fd
    },
}