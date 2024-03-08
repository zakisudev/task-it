const Task = require('../models/taskModel');
const mongoose = require('mongoose');

// Get all tasks
const getTasks = async (_, res) => {
  try {
    const tasks = await Task.find().sort({ updatedAt: -1 });

    if (!tasks) {
      return res
        .status(200)
        .json({ message: 'No tasks found', success: false });
    }

    res.status(200).json({ tasks, success: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Server Error', success: false });
  }
};

// Create a new task
const createTask = async (req, res) => {
  const { title, description, completed, priority } = req.body;

  if (!title) {
    return res
      .status(200)
      .json({ message: 'Title is required', success: false });
  }

  if (!priority) {
    return res
      .status(200)
      .json({ message: 'Priority is required', success: false });
  }

  try {
    const task = await Task.create({
      title,
      description,
      completed,
      priority,
    });

    if (!task) {
      return res
        .status(200)
        .json({ message: 'Error creating task', success: false });
    }

    res.status(201).json({ task, success: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Server Error', success: false });
  }
};

// Update a task
const updateTask = async (req, res) => {
  const { title, description, completed, priority } = req.body;
  const { id: taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(200).json({ message: 'Invalid task Id', success: false });
  }

  if (!title && !description && !completed && !priority) {
    return res
      .status(200)
      .json({ message: 'Please change at least one field', success: false });
  }

  try {
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res
        .status(200)
        .json({ message: 'Task not found', success: false });
    }

    if (title) existingTask.title = title;
    if (description) existingTask.description = description;
    if (completed.toString() === 'true') {
      existingTask.completed = completed;
    } else if (completed.toString() === 'false') {
      existingTask.completed = completed;
    }

    if (priority) existingTask.priority = priority;

    const updatedTask = await existingTask.save();

    if (!updatedTask) {
      return res
        .status(200)
        .json({ message: 'Error updating task, try again', success: false });
    }

    res.status(200).json({ updatedTask, success: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Server Error', success: false });
  }
};

// Delete a task
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(200).json({ message: 'Invalid task Id', success: false });
  }

  try {
    const existingTask = await Task.findById(taskId);

    if (!existingTask) {
      return res
        .status(200)
        .json({ message: 'Task not found', success: false });
    }

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res
        .status(200)
        .json({ message: 'Error deleting task, try again', success: false });
    }

    res.status(200).json({ task: deletedTask._id, success: true });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: 'Server Error', success: false });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
