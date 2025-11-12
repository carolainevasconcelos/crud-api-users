// CÓDIGO CORRETO FINAL para src/services/userService.test.js

// Mock manual NO TOPO para garantir que as funções existam
jest.mock('../models/userModel', () => ({ // Deixe este minúsculo, como o nome do arquivo
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const userService = require('../services/userService');
const userModel = require('../models/userModel');

// Limpa os mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
});

test('Deve retornar lista de usuários', async () => {
  const mockUsers = [{ id: 1, name: 'Test User' }];
  userModel.getAllUsers.mockResolvedValue(mockUsers);

  const result = await userService.getAllUsers();

  expect(result).toEqual(mockUsers);
  expect(Array.isArray(result)).toBe(true);
  expect(userModel.getAllUsers).toHaveBeenCalledTimes(1);
});

test('Deve retornar um usuário específico pelo ID', async () => {
  const mockUser = { id: 1, name: 'Test User' };
  userModel.getUserById.mockResolvedValue(mockUser);

  const result = await userService.getUserById(1);

  expect(result).toEqual(mockUser);
  expect(result.id).toBe(1);
  expect(userModel.getUserById).toHaveBeenCalledWith(1);
});