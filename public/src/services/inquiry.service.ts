import { sendRequest } from "@/public/src/library/api";
import type { InquiryList, InquiryPayload, UpdateInquiryPayload } from "@/public/src/types/inquiry.type";

export const AdminInquiryService = {

    getList() {
        return sendRequest({
            url: "/api/auth/inquiries",
            method: "GET",
        });
    },

    getOne(id: number) {
        return sendRequest<InquiryList>({
            url: `/api/auth/inquiries/${id}`,
            method: "GET",
        });
    },

    update(id: number, body: UpdateInquiryPayload) {
        return sendRequest({
            url: `/api/auth/inquiries/${id}`,
            method: "PUT",
            body,
        });
    }
,
    delete(id: number) {
        return sendRequest({
            url: `/api/auth/inquiries/${id}`,
            method: "DELETE",
        });
    }
}

