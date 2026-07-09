import { sendRequest } from "@/public/src/library/api"
import type { DashboardData } from "@/public/src/types/dashboard.type"

class DashboardService {
    async getDashboard(): Promise<DashboardData> {
        const res = await sendRequest({
            url: "/api/auth/dashboard",
            method: "GET",
        })
        return res.data ?? res
    }
}

export const dashboardService = new DashboardService()