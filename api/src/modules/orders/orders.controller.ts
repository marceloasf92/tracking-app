import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body()
    orderData: {
      customerName: string;
      deliveryAddress: string;
      status: string;
      userId: number;
    },
  ) {
    return this.ordersService.createOrder(orderData);
  }

  @Get()
  async findAllOrders() {
    return this.ordersService.findAllOrders();
  }

  @Get('order/:id')
  async findOrderById(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOrderById(id);
  }

  @Get('user/:id')
  async findOrdersByUserId(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOrdersByUserId(id);
  }

  @Put(':id')
  async updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    orderData: {
      status?: string;
    },
  ) {
    return this.ordersService.updateOrder(id, orderData);
  }

  @Delete(':id')
  async deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.deleteOrder(id);
  }
}
