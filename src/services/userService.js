// CÓDIGO CORRIGIDO E COMPLETO
// src/services/userService.js

// CORRIGIDO: A importação agora usa "userModel" (minúsculo) e importa o objeto inteiro
const userModel = require('../models/userModel');

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    // CORRIGIDO: Chama a função usando "userModel."
    const users = await userModel.getAllUsers();
    return users;
  } catch (error) {
    throw new Error('Erro ao buscar usuários: ' + error.message);
  }
};

// Função para obter um usuário por ID
// CORRIGIDO: O bug de "users.find" foi totalmente reescrito
const getUserById = async (id) => {
  try {
    // CORRIGIDO: Chama a função usando "userModel."
    const user = await userModel.getUserById(id);
    return user;
  } catch (error) {
    throw new Error('Erro ao buscar usuário por ID: ' + error.message);
  }
};

// Função para criar um novo usuário
const createUser = async (user) => {
  try {
    // CORRIGIDO: Chama a função usando "userModel."
    const result = await userModel.createUser(user);
    return result;
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Função para atualizar um usuário
const updateUser = async (id, user) => {
  try {
    // CORRIGIDO: Chama a função usando "userModel."
    const result = await userModel.updateUser(id, user);
    return result;
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário
const deleteUser = async (id) => {
  try {
    // CORRIGIDO: Chama a função usando "userModel."
    const result = await userModel.deleteUser(id);
    return result;
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

// ADICIONADO: Exporta as funções para que os testes possam encontrá-las
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};