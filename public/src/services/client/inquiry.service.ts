import { sendRequest } from "@/public/src/library/api";
import type {
    InquiryPayload,
    InquiryResponse,
} from "@/public/src/types/inquiry.type";

class InquiryService {

    create(data: InquiryPayload) {

        return sendRequest<InquiryResponse>({

            url: "/api/inquiries",

            method: "POST",

            body: data,

        });

    }

    getList() {
        return sendRequest({
            url: "/api/auth/inquiries",
            method: "GET",
        });
    }

}

export const inquiryService = new InquiryService();