import { sendRequest } from "@/public/src/library/api";


export const brandService = {

    getBrands() {
        return sendRequest({
            url: "/api/auth/brands",
            method: "GET",
        });
    },

    getBrand(id: number) {
        return sendRequest({
            url: `/api/auth/brands/${id}`,
            method: "GET",
        });
    },

    createBrand(data: FormData) {
        return sendRequest({
            url: "/api/auth/brands",
            method: "POST",
            body: data,
        });
    },

    updateBrand(id: number, data: FormData) {
        return sendRequest({
            url: `/api/auth/brands/${id}`,
            method: "PUT",
            body: data,
        });
    },

    deleteBrand(id: number) {
        return sendRequest({
            url: `/api/auth/brands/${id}`,
            method: "DELETE",
        });
    },

};