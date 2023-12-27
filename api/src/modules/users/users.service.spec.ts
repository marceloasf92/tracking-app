import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  const user = {
    id: 1,
    name: 'Marcelo Alves',
    email: 'marcelo@mail.com',
    password: 'password123',
    admin: true, // Adicionado
  };

  const newUserOne = {
    name: 'Teste',
    email: 'teste@mail.com',
    password: 'password123',
    admin: false, // Adicionado
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findMany: jest.fn().mockResolvedValue([]),
              findUnique: jest.fn().mockResolvedValue({}),
              create: jest.fn().mockResolvedValue({}),
              update: jest.fn().mockResolvedValue({}),
              delete: jest.fn().mockResolvedValue({}),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [user];
      jest
        .spyOn(prismaService.user, 'findMany')
        .mockResolvedValue(expectedUsers);
      expect(await service.findAll()).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const expectedUser = user;
      jest
        .spyOn(prismaService.user, 'findUnique')
        .mockResolvedValue(expectedUser);
      expect(await service.findOne(1)).toEqual(expectedUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser = newUserOne;
      const createdUser = { id: 2, ...newUser };
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(createdUser);
      expect(await service.create(newUser)).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updatedUser = user;
      jest.spyOn(prismaService.user, 'update').mockResolvedValue(updatedUser);
      expect(await service.update(1, updatedUser)).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const deletedUser = user;
      jest.spyOn(prismaService.user, 'delete').mockResolvedValue(deletedUser);
      expect(await service.remove(1)).toEqual(deletedUser);
    });
  });
});
