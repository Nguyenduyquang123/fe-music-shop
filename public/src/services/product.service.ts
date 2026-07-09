import { sendRequest } from "@/public/src/library/api";

export const productService = {

  
    getProducts(page = 1) {
    return sendRequest({
        url: `/api/auth/products?page=${page}`,
        method: "GET",
    });
},

    getProduct(id: number, isAdmin: boolean = true) {
        return sendRequest({
            url: `/api/auth/products/${id}${isAdmin ? '?mode=admin' : ''}`,
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
    getBrands() {
        return sendRequest({
            url: "/api/auth/brands",
            method: "GET",
        });
    },

    getCategories() {
        return sendRequest({
            url: "/api/auth/categories",
            method: "GET",
        });
    },
    

};

