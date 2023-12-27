import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrdersService;

  beforeEach(async () => {
    const mockOrdersService = {
      createOrder: jest.fn(),
      findAllOrders: jest.fn(),
      findOrderById: jest.fn(),
      updateOrder: jest.fn(),
      deleteOrder: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrdersService, useValue: mockOrdersService }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllOrders', () => {
    it('should return an array of orders', async () => {
      const result = [
        {
          id: 1,
          customerName: 'Teste',
          deliveryAddress: 'Rua Teste 01',
          status: 'Em andamento',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
        },
        {
          id: 2,
          customerName: 'Teste',
          deliveryAddress: 'Rua Teste 02',
          status: 'Entregue',
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
        },
      ];
      jest.spyOn(service, 'findAllOrders').mockResolvedValue(result);

      expect(await controller.findAllOrders()).toEqual(result);
    });
  });

  describe('findOrderById', () => {
    it('should return a single order', async () => {
      const result = {
        id: 1,
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Entregue',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        user: {
          id: 1,
          name: 'Teste',
          email: 'teste@mail.com',
          password: 'hashedPassword',
          admin: true,
        },
      };
      jest.spyOn(service, 'findOrderById').mockResolvedValue(result);

      expect(await controller.findOrderById(1)).toEqual(result);
    });
  });

  describe('createOrder', () => {
    it('should create a new order', async () => {
      const newOrderData = {
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Em andamento',
        userId: 1,
      };

      const createdOrder = {
        ...newOrderData,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'createOrder').mockResolvedValue(createdOrder);

      expect(await controller.createOrder(newOrderData)).toBe(createdOrder);
    });
  });

  describe('updateOrder', () => {
    it('should update an order', async () => {
      const orderUpdateData = {
        status: 'Em andamento',
      };

      const updatedOrder = {
        id: 1,
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Entregue',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      };

      jest.spyOn(service, 'updateOrder').mockResolvedValue(updatedOrder);

      expect(await controller.updateOrder(1, orderUpdateData)).toBe(
        updatedOrder,
      );
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order', async () => {
      const deletedOrder = {
        id: 1,
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Entregue',
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
      };

      jest.spyOn(service, 'deleteOrder').mockResolvedValue(deletedOrder);

      await controller.deleteOrder(1);
      expect(service.deleteOrder).toHaveBeenCalledWith(1);
    });
  });
});
