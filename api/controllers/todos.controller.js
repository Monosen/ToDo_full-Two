// Models
const { Todos } = require('../models/todos.model');

// Util
const { filterObj } = require('../util/filterObj');

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todos.findAll({ where: { status: 'active' } });

    res.status(200).json({ status: 'success', data: { todos } });
  } catch (error) {
    console.log(error);
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { content } = req.body;

    const newTodo = await Todos.create({ content });

    res.status(201).json({ status: 'success', data: { newTodo } });
  } catch (error) {
    console.log(error);
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const newObj = filterObj(req.body, 'content');

    const todo = await Todos.findOne({ where: { id, status: 'active' } });

    if (!todo) {
      return res.status(404).json({
        status: 'error',
        message: 'To Do could not be updated'
      });
    }

    await todo.update({ ...newObj });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const todo = await Todos.findOne({ where: { id, status: 'active' } });

    if (!todo) {
      return res.status(404).json({
        status: 'error',
        message: `Can't delete ToDo because it doesn't exists`
      });
    }

    await todo.update({ status: 'deleted' });

    res.status(204).json({ status: 'success' });
  } catch (error) {
    console.log(error);
  }
};
