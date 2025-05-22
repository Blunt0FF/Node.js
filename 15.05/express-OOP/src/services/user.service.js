import { UserModel } from '../models/user.model.js';

export class UserService {
  constructor() {
    this.userModel = new UserModel();
  }

  async getAllUsers() {
    return this.userModel.find();
  }

  async getUserById(id) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async createUser(userData) {
    const { email, username } = userData;
    
    // Check if user already exists
    const existingUser = await this.userModel.findByEmail(email) || 
                        await this.userModel.findByUsername(username);
    if (existingUser) {
      throw new Error('User with this email or username already exists');
    }

    return this.userModel.create(userData);
  }

  async updateUser(id, userData) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return this.userModel.update(id, userData);
  }

  async deleteUser(id) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    return this.userModel.delete(id);
  }
} 