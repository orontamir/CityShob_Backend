const Task = require('../models/task.model');

class Repository {
  async getAllTasks() {
    return await Task.find().sort({ createdAt: -1 });
  }

  async getTaskById(id) {
    return await Task.findById(id);
  }

  async createTask(data) {
    const task = new Task(data);
    return await task.save();
  }

  async updateTask(id, data) {
    return await Task.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteTask(id) {
    return await Task.findByIdAndDelete(id);
  }
}

module.exports = new Repository();
