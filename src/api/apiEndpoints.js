import { API_BASE_URL } from "./config";

export const auth = {
    refreshToken: `${API_BASE_URL}/auth/v1/refresh-token`,
}

export const order = {
    purchaseOrder: `${API_BASE_URL}/purchase_order/v1`,
}
