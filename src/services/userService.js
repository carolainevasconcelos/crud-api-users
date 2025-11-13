// CÓDIGO FINAL CORRIGIDO E AMPLIADO para src/services/userService.test.js

// Mock manual para garantir que as funções existam (e impedir o DB)
jest.mock('../models/userModel', () => ({
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const userService = require('../services/userService');
const userModel = require('../models/userModel');

beforeEach(() => {
  jest.clearAllMocks();
});

// TESTE 1: Leitura (Busca Geral)
test('Garante que getAllUsers retorna a lista de usuários', async () => {
  const listaDeTeste = [{ id: 1, name: 'Test User' }];
  userModel.getAllUsers.mockResolvedValue(listaDeTeste);

  const resultado = await userService.getAllUsers();

  expect(resultado).toEqual(listaDeTeste);
  expect(userModel.getAllUsers).toHaveBeenCalledTimes(1);
});

// TESTE 2: Leitura (Busca por ID)
test('Garante que getUserById retorna um usuário específico', async () => {
  const usuarioMockado = { id: 1, name: 'Test User' };
  userModel.getUserById.mockResolvedValue(usuarioMockado);

  const resultado = await userService.getUserById(1);

  expect(resultado).toEqual(usuarioMockado);
  expect(userModel.getUserById).toHaveBeenCalledWith(1);
});

// NOVO TESTE 3: Criação (CRUD)
test('Deve criar um novo usuário e retornar seu objeto', async () => {
  const novosDados = { name: 'New User', email: 'a@a.com' };
  userModel.createUser.mockResolvedValue({ id: 3, ...novosDados });

  const resultado = await userService.createUser(novosDados);

  expect(resultado.id).toBeDefined();
  expect(resultado.name).toBe('New User');
  expect(userModel.createUser).toHaveBeenCalledWith(novosDados);
});

// NOVO TESTE 4: Atualização (CRUD)
test('Deve atualizar um usuário existente e retornar sucesso', async () => {
  const updates = { name: 'Updated Name' };
  userModel.updateUser.mockResolvedValue(true); 

  const resultado = await userService.updateUser(1, updates);

  expect(resultado).toBe(true);
  expect(userModel.updateUser).toHaveBeenCalledWith(1, updates);
});

// NOVO TESTE 5: Deleção (CRUD)
test('Deve deletar um usuário existente e retornar sucesso', async () => {
  userModel.deleteUser.mockResolvedValue(true); 
  
  const resultado = await userService.deleteUser(1);

  expect(resultado).toBe(true);
  expect(userModel.deleteUser).toHaveBeenCalledWith(1);
});