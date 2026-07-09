import { sendRequest } from "@/public/src/library/api"

export const contentService = {
    // About
    getAbout() {
        return sendRequest({ url: '/api/auth/content/about', method: 'GET' })
    },
      updateAbout(data: object) {
          return sendRequest({
              url: "/api/auth/content/about",
              method: "PUT",
              body: data,
          });
      },

    // Contact
    getContact() {
        return sendRequest({ url: '/api/auth/content/contact', method: 'GET' })
    },
    updateContact(data: object) {
        return sendRequest({ url: '/api/auth/content/contact', method: 'PUT', body: data })
    },

    // Banner
    getBanners() {
        return sendRequest({ url: '/api/auth/banners', method: 'GET' })
    },
    createBanner(formData: FormData) {
        return sendRequest({ url: '/api/auth/banners', method: 'POST', body: formData })
    },
    updateBanner(id: number, formData: FormData) {
        formData.append('_method', 'PUT')
        return sendRequest({ url: `/api/auth/banners/${id}`, method: 'POST', body: formData })
    },
    deleteBanner(id: number) {
        return sendRequest({ url: `/api/auth/banners/${id}`, method: 'DELETE' })
    },

    // Site texts
    getSiteTexts() {
        return sendRequest({ url: '/api/auth/content/site-texts', method: 'GET' })
    },
    updateSiteText(id: number, value: string) {
        return sendRequest({
            url: `/api/auth/content/site-texts/${id}`,
            method: 'PUT',
            body: JSON.stringify({ value }),
        })
    },
}