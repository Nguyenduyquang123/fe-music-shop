import { sendRequest } from "@/public/src/library/api"

export const clientContentService = {
    getAbout() {
        return sendRequest({ url: '/api/content/about' })
    },
    getContact() {
        return sendRequest({ url: '/api/content/contact' })
    },
    getBanners() {
        return sendRequest({ url: '/api/content/banners' })
    },
    getFeaturedblogs() {
        return sendRequest({ url: '/api/content/featuredblogs' })
    },
}