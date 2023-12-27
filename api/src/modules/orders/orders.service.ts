import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(orderData: {
    customerName: string;
    deliveryAddress: string;
    status: string;
    userId: number;
  }) {
    return this.prisma.order.create({
      data: orderData,
    });
  }

  async findAllOrders() {
    return this.prisma.order.findMany();
  }

  async findOrderById(id: number) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async findOrdersByUserId(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { user: true },
    });
  }

  async updateOrder(
    id: number,
    orderData: {
      status?: string;
    },
  ) {
    return this.prisma.order.update({
      where: { id },
      data: orderData,
    });
  }

  async deleteOrder(id: number) {
    return this.prisma.order.delete({
      where: { id },
    });
  }
}
