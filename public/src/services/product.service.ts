import { sendRequest } from "@/public/src/library/api";


export const productService = {

    getProducts() {
        return sendRequest({
            url: "/api/auth/products",
            method: "GET",
        });
    },

    getProduct(id: number) {
        return sendRequest({
            url: `/api/auth/products/${id}`,
            method: "GET",
        });
    },

    createProduct(data: FormData) {
        return sendRequest({
            url: "/api/auth/products",
            method: "POST",
            body: data,
        });
    },

    updateProduct(id: number, data: FormData) {
        return sendRequest({
            url: `/api/auth/products/${id}`,
            method: "PUT",
            body: data,
        });
    },

    deleteProduct(id: number) {
        return sendRequest({
            url: `/api/auth/products/${id}`,
            method: "DELETE",
        });
    },

};