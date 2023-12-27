import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const user = {
    id: 1,
    name: 'Marcelo Alves',
    email: 'marcelo@mail.com',
    password: 'password123',
    admin: true,
  };

  const newUserOne = {
    name: 'Teste',
    email: 'teste@mail.com',
    password: 'password123',
    admin: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const expectedUsers = [user];
      jest.spyOn(usersService, 'findAll').mockResolvedValue(expectedUsers);
      expect(await controller.findAll()).toEqual(expectedUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const expectedUser = user;
      jest.spyOn(usersService, 'findOne').mockResolvedValue(expectedUser);
      expect(await controller.findOne(1)).toEqual(expectedUser);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser = newUserOne;
      const createdUser = { id: 2, ...newUser };
      jest.spyOn(usersService, 'create').mockResolvedValue(createdUser);
      expect(await controller.create(newUser)).toEqual(createdUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updatedUser = user;
      jest.spyOn(usersService, 'update').mockResolvedValue(updatedUser);
      expect(await controller.update(1, updatedUser)).toEqual(updatedUser);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const deletedUser = user;
      jest.spyOn(usersService, 'remove').mockResolvedValue(deletedUser);
      expect(await controller.remove(1)).toEqual(deletedUser);
    });
  });
});
