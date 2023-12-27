import { Api } from "../axios-config";

export const orderService = {
  async fetchOrders(userId: number, token: string) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await Api.get(`orders/user/${userId}`, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateOrderStatus(orderId: number, status: string, token: string) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await Api.put(`orders/${orderId}`, { status }, config);
    } catch (error) {
      throw error;
    }
  },
};
