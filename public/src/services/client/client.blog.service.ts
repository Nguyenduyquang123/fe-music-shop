import { sendRequest } from "@/public/src/library/api"
import type { BlogQuery } from "@/public/src/types/blog.types"

const buildQuery = (params?: BlogQuery): string => {
    if (!params) return ""
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            const valStr = typeof value === 'boolean' ? (value ? '1' : '0') : String(value)
            query.append(key, valStr)
        }
    })
    return query.toString() ? `?${query.toString()}` : ""
}

export const clientBlogService = {
    getBlogs(params?: BlogQuery) {
        return sendRequest({ url: `/api/blogs${buildQuery(params)}` })
    },
    getBlog(id: number) {
        return sendRequest({ url: `/api/blogs/${id}` })
    },
    getCategories() {
        return sendRequest({ url: "/api/blog-categories" })
    },
    getRelatedBlogs(id: number) {
        return sendRequest({ url: `/api/blogs/${id}/related` })
    }
}