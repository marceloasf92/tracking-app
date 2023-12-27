import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { PrismaService } from '../prisma/prisma.service';

describe('OrdersService', () => {
  let service: OrdersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const mockPrismaService = {
      order: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllOrders', () => {
    it('should return an array of orders', async () => {
      const expectedOrders = [
        {
          id: 1,
          customerName: 'Teste',
          deliveryAddress: 'Rua Teste 02',
          status: 'Em andamento',
          createdAt: new Date('2023-01-01'),
          updatedAt: new Date('2023-01-02'),
          userId: 10,
        },
        {
          id: 2,
          customerName: 'Teste',
          deliveryAddress: 'Rua Teste 02',
          status: 'Entregue',
          createdAt: new Date('2023-01-03'),
          updatedAt: new Date('2023-01-04'),
          userId: 11,
        },
      ];
      jest
        .spyOn(prismaService.order, 'findMany')
        .mockResolvedValue(expectedOrders);
      expect(await service.findAllOrders()).toEqual(expectedOrders);
    });
  });

  describe('findOrderById', () => {
    it('should return a single order', async () => {
      const expectedOrder = {
        id: 1,
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Em andamento',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-02'),
        userId: 10,
      };
      jest
        .spyOn(prismaService.order, 'findUnique')
        .mockResolvedValue(expectedOrder);
      expect(await service.findOrderById(1)).toEqual(expectedOrder);
    });
  });

  describe('createOrder', () => {
    it('should create and return a new order', async () => {
      const orderData = {
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Em andamento',
        userId: 12,
      };
      const createdOrder = {
        id: 3,
        ...orderData,
        createdAt: new Date('2023-01-05'),
        updatedAt: new Date('2023-01-05'),
      };
      jest.spyOn(prismaService.order, 'create').mockResolvedValue(createdOrder);
      expect(await service.createOrder(orderData)).toEqual(createdOrder);
    });
  });

  describe('updateOrder', () => {
    it('should update and return an order', async () => {
      const updateData = {
        status: 'Entregue',
      };
      const updatedOrder = {
        id: 1,
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Em andamento',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-06'),
        userId: 10,
      };
      jest.spyOn(prismaService.order, 'update').mockResolvedValue(updatedOrder);
      expect(await service.updateOrder(1, updateData)).toEqual(updatedOrder);
    });
  });

  describe('deleteOrder', () => {
    it('should delete an order', async () => {
      const deletedOrder = {
        id: 1,
        customerName: 'Teste',
        deliveryAddress: 'Rua Teste 02',
        status: 'Entregue',
        createdAt: new Date('2023-01-01'),
        updatedAt: new Date('2023-01-06'),
        userId: 10,
      };
      jest.spyOn(prismaService.order, 'delete').mockResolvedValue(deletedOrder);
      await service.deleteOrder(1);
      expect(prismaService.order.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
