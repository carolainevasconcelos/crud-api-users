// CÓDIGO NOVO (SUBSTITUA OS TESTES EXISTENTES no userController.test.js)

test('Deve verificar se a função de criação (createUser) é definida', () => {
  expect(typeof userController.createUser).toBe('function');
});

// NOVO TESTE 1: Verifica o fluxo de sucesso
test('getAll deve chamar o serviço e retornar status 200 (Sucesso)', async () => {
  const dadosMockados = [{ id: 10, nome: 'Usuário A' }];
  userService.getAllUsers.mockResolvedValue(dadosMockados);

  const reqSimulada = {};
  const resSimulada = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await userController.getAll(reqSimulada, resSimulada);

  expect(userService.getAllUsers).toHaveBeenCalledTimes(1);
  expect(resSimulada.status).toHaveBeenCalledWith(200);
  expect(resSimulada.json).toHaveBeenCalledWith(dadosMockados);
});

// NOVO TESTE 2: Verifica o fluxo de falha (erro 404)
test('getById deve retornar status 404 quando o usuário não é encontrado', async () => {
  // Simula o service retornando nulo (usuário não existe)
  userService.getById.mockResolvedValue(null); 

  const reqSimulada = { params: { id: 999 } };
  const resSimulada = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  await userController.getById(reqSimulada, resSimulada);

  expect(userService.getById).toHaveBeenCalledWith('999'); // Verifica a chamada do service
  expect(resSimulada.status).toHaveBeenCalledWith(404);
  expect(resSimulada.json).toHaveBeenCalledWith({ message: 'Usuário não encontrado' });
});