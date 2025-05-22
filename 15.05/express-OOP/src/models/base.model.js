import mongoose from 'mongoose';

export class BaseModel {
  constructor(schema) {
    this.model = mongoose.model(this.constructor.name, schema);
  }

  async find() {
    return this.model.find();
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async create(data) {
    const instance = new this.model(data);
    return instance.save();
  }

  async update(id, data) {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
} 