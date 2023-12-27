// features/order/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Order {
  id: number;
  customerName: string;
  deliveryAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId?: number;
}

interface OrderState {
  orders: Order[];
}

const initialState: OrderState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
