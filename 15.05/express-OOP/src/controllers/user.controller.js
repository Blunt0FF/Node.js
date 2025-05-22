import { UserService } from '../services/user.service.js';

export class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req, res) {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(error.message === 'User not found' ? 404 : 500)
         .json({ message: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(error.message === 'User not found' ? 404 : 400)
         .json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await this.userService.deleteUser(req.params.id);
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(error.message === 'User not found' ? 404 : 500)
         .json({ message: error.message });
    }
  }
} 

