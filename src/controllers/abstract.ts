import { Request, Response } from 'express';
import { Service } from '../services';

export abstract class Controller<T> {
  private OBJECT_NOT_FOUND = 'Object not found';

  constructor(
    protected service: Service<T>,
  ) {
    this.create = this.create.bind(this);
    this.read = this.read.bind(this);
    this.readOne = this.readOne.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const result = await this.service.create(req.body);
    return res.status(201).json(result);
  }

  public async read(req: Request, res: Response): Promise<Response> {
    const result = await this.service.read();
    return res.status(200).json(result);
  }

  public async readOne(req: Request, res: Response): Promise<Response> {
    const result = await this.service.readOne(req.params.id);
    if (!result) return res.status(404).json({ error: this.OBJECT_NOT_FOUND });
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const result = await this.service.update(req.params.id, req.body);
    if (!result) return res.status(404).json({ error: this.OBJECT_NOT_FOUND });
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response): Promise<Response | void> {
    const result = await this.service.delete(req.params.id);
    if (!result) return res.status(404).json({ error: this.OBJECT_NOT_FOUND });
    return res.status(204).end();
  }
}

export const againstDefaultExport = '';