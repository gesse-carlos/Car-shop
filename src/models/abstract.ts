import { Document, Model as M } from 'mongoose';
import { Model } from '../interfaces';

export abstract class MongoModel<T> implements Model<T> {
  constructor(protected model: M<T & Document>) {}

  public async create(data: T): Promise<T> {
    return this.model.create(data);
  }

  public async read(): Promise<T[]> {
    return this.model.find();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.findById(id);
  }

  public async update(id: string, data: T): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export const againstDefaultExport = '';
