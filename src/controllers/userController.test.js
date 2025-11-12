// CÓDIGO CORRETO FINAL para src/controllers/userController.test.js

// Mock NO TOPO para parar o erro do banco de dados
jest.mock('../models/userModel'); 

// Mock NO TOPO para isolar o controller
jest.mock('../services/userService', () => ({
  getAllUsers: jest.fn(),
  getById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const userController = require('../controllers/userController');
const userService = require('../services/userService');

// Limpa os mocks antes de cada teste
beforeEach(() => {
  jest.clearAllMocks();
});

test('Deve verificar se a função getAll é definida', () => {
  expect(typeof userController.getAll).toBe('function');
});

test('Deve verificar se a função getById é definida', () => {
  expect(typeof userController.getById).toBe('function');
});

test('getAll deve chamar userService.getAllUsers e retornar 200', async () => {
  const mockUsers = [{ id: 1, name: 'Test' }];
  userService.getAllUsers.mockResolvedValue(mockUsers);

  const mockRequest = {};
  const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await userController.getAll(mockRequest, mockResponse);

  expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
  expect(mockResponse.status).toHaveBeenCalledWith(200);
  expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
});