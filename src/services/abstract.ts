import { Model } from '../interfaces';

export abstract class Service<T> {
  constructor(protected model: Model<T>) {}

  public async create(item: T): Promise<T> {
    return this.model.create(item);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  public async update(id: string, item: T): Promise<T | null> {
    return this.model.update(id, item);
  }

  public async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}

export const againstDefaultExport = '';
