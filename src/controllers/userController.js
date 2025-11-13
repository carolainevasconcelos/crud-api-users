// CÓDIGO FINAL CORRIGIDO E AMPLIADO para src/controllers/userController.test.js

// Mocks para impedir o DB e isolar o controller
jest.mock('../models/userModel'); 
jest.mock('../services/userService', () => ({
  getAllUsers: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
}));

const userController = require('../controllers/userController');
const userService = require('../services/userService');

beforeEach(() => {
  jest.clearAllMocks();
});

// TESTE 1: Validação de Existência
test('Valida a existência do método getAll', () => {
  expect(typeof userController.getAll).toBe('function');
});

// TESTE 2: Validação de Existência
test('Valida a existência do método getById', () => {
  expect(typeof userController.getById).toBe('function');
});

// TESTE 3: Fluxo de Sucesso (GET)
test('getAll deve chamar o serviço e retornar status 200', async () => {
  const dadosMockados = [{ id: 10, nome: 'Usuário A' }];
  userService.getAllUsers.mockResolvedValue(dadosMockados);

  const reqSimulada = {};
  const resSimulada = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  await userController.getAll(reqSimulada, resSimulada);

  expect(resSimulada.status).toHaveBeenCalledWith(200);
  expect(resSimulada.json).toHaveBeenCalledWith(dadosMockados);
});

// NOVO TESTE 4: Fluxo de Erro (GET ALL 500)
test('getAll deve retornar status 500 em caso de falha do serviço', async () => {
  userService.getAllUsers.mockRejectedValue(new Error('Falha no DB')); 

  const reqSimulada = {};
  const resSimulada = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  await userController.getAll(reqSimulada, resSimulada);

  expect(resSimulada.status).toHaveBeenCalledWith(500);
});

// NOVO TESTE 5: Fluxo de Erro (GET BY ID 404)
test('getById deve retornar status 404 quando o usuário não é encontrado', async () => {
  userService.getById.mockResolvedValue(null); 

  const reqSimulada = { params: { id: 99 } };
  const resSimulada = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  await userController.getById(reqSimulada, resSimulada);

  expect(userService.getById).toHaveBeenCalledWith('99');
  expect(resSimulada.status).toHaveBeenCalledWith(404);
});

// NOVO TESTE 6: Criação (POST 201)
test('createUser deve retornar status 201 após criação bem-sucedida', async () => {
    userService.createUser.mockResolvedValue({ id: 100, name: 'Novo' });

    const reqSimulada = { body: { name: 'Novo' } };
    const resSimulada = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.createUser(reqSimulada, resSimulada);

    expect(resSimulada.status).toHaveBeenCalledWith(201);
});

// NOVO TESTE 7: Atualização (PUT 200)
test('updateUser deve retornar status 200 após atualização', async () => {
    userService.updateUser.mockResolvedValue({ id: 5, name: 'Atualizado' });

    const reqSimulada = { params: { id: 5 }, body: { name: 'Novo' } };
    const resSimulada = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.updateUser(reqSimulada, resSimulada);

    expect(resSimulada.status).toHaveBeenCalledWith(200);
});

// NOVO TESTE 8: Deleção (DELETE 200)
test('deleteUser deve retornar status 200 após deletar com sucesso', async () => {
    userService.deleteUser.mockResolvedValue(true); 

    const reqSimulada = { params: { id: 5 } };
    const resSimulada = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    await userController.deleteUser(reqSimulada, resSimulada);

    expect(resSimulada.status).toHaveBeenCalledWith(200);
});