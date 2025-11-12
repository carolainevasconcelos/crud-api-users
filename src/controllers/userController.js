// CÓDIGO CORRIGIDO E COMPLETO
// src/controllers/userController.js

const userService = require('../services/userService');

// Função para listar usuários
// O NOME FOI RENOMEADO DE "listUsers" PARA "getAll"
const getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para obter um usuário por ID
// O NOME FOI RENOMEADO DE "getUser" PARA "getById"
const getById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para criar um novo usuário
const createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para atualizar um usuário
const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Função para deletar um usuário
const deleteUser = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADICIONADO: Exporta as funções para que os testes possam encontrá-las
module.exports = {
  getAll,
  getById,
  createUser,
  updateUser,
  deleteUser
};