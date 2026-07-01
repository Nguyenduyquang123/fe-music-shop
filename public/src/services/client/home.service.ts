import { sendRequest } from "@/public/src/library/api";

export const homeService = {

    getHomeData() {
        return sendRequest({
            url: "/api/client/home",
        });
    },

    getFeaturedProducts() {
        return sendRequest({
            url: "/api/client/products?featured=1",
        });
    },

    getNewestProducts() {
        return sendRequest({
            url: "/api/client/products?sort=newest",
        });
    },

    getBestSellerProducts() {
        return sendRequest({
            url: "/api/client/products?sort=best-selling",
        });
    }

};