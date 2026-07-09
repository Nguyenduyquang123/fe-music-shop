import { sendRequest } from "@/public/src/library/api";
import { ProductQuery } from "@/public/src/types/type";

const buildQuery = (params?: ProductQuery): string => {
    if (!params) return ""
    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            query.append(key, String(value))
        }
    })
    return query.toString() ? `?${query.toString()}` : ""
}

export const clientProductService = {
    getAll() {
        return sendRequest({
            url: "/api/products",
        })
    },
    getProducts(params?: ProductQuery) {
        return sendRequest({
            url: `/api/products${buildQuery(params)}`,
        })
    },

    getProduct(id: number) {
        return sendRequest({
            url: `/api/products/${id}`,
        })
    },

    getRelatedProducts(id: number) {
        return sendRequest({
            url: `/api/products/${id}/related`,
        })
    },

    search(keyword: string) {
        return sendRequest({
            url: `/api/products${buildQuery({ keyword })}`,
        })
    },

    increaseView(id: number) {
        return sendRequest({
            url: `/api/products/${id}/view`,
            method: "POST",
        })
    },

    getCategories() {
        return sendRequest({
            url: "/api/categories",
        })
    },

    getBrands() {
        return sendRequest({
            url: "/api/brands",
        })
    },
}