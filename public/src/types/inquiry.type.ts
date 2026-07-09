export interface InquiryPayload {
    product_id: number;
    full_name: string;
    phone: string;
    note?: string;
}

export interface Inquiry {
    id: number;
    product_id: number;
    full_name: string;
    phone: string;
    note?: string;
    status: 'pending' | 'contacted';
    contacted_at?: string | null;
    created_at: string;
}

export interface InquiryResponse {
    message: string;
    data: Inquiry;
}
export interface InquiryList {
    id: number;
    product_id: number;

    product: {
        id: number;
        name: string;
        slug: string;
    };

    full_name: string;

    phone: string;

    note?: string;

    status: "pending" | "contacted";

    contacted_at?: string | null;

    created_at: string;
}

export interface UpdateInquiryPayload {
    status: "pending" | "contacted";
}

