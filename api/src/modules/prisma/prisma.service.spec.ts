import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

describe('PrismaService', () => {
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    prismaService.$connect = jest.fn();
    prismaService.$disconnect = jest.fn();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  describe('onModuleInit', () => {
    it('should connect to the database', async () => {
      await prismaService.onModuleInit();
      expect(prismaService.$connect).toHaveBeenCalled();
    });
  });

  describe('onModuleDestroy', () => {
    it('should disconnect from the database', async () => {
      await prismaService.onModuleDestroy();
      expect(prismaService.$disconnect).toHaveBeenCalled();
    });
  });
});
