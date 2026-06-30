import { sendRequest } from "@/public/src/library/api";


export const categoryService = {

    getCategories() {
        return sendRequest({
            url: "/api/auth/categories",
            method: "GET",
        });
    },

    getCategory(id: number) {
        return sendRequest({
            url: `/api/auth/categories/${id}`,
            method: "GET",
        });
    },

    createCategory(data: FormData) {
        return sendRequest({
            url: "/api/auth/categories",
            method: "POST",
            body: data,
        });
    },

    updateCategory(id: number, data: FormData) {
        return sendRequest({
            url: `/api/auth/categories/${id}`,
            method: "PUT",
            body: data,
        });
    },

    deleteCategory(id: number) {
        return sendRequest({
            url: `/api/auth/categories/${id}`,
            method: "DELETE",
        });
    },

};