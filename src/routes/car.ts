import { Router } from 'express';
import { Controller } from '../controllers';
import { ICar, IMiddlewares, IValidator } from '../interfaces';

export class CarRouter {
  public router = Router();

  constructor(
    private controller: Controller<ICar>,
    private middlewares: IMiddlewares,
    private validators: IValidator,
  ) {
    this.init();
    this.initAgain();
  }

  public init(): void {
    this.router.post(
      '/',
      this.middlewares.validateBody(this.validators.carValidator),
      this.controller.create,
    );

    this.router.get('/', this.controller.read);

    this.router.get(
      '/:id',
      this.middlewares.validatePathId,
      this.controller.readOne,
    );

    this.router.put(
      '/:id',
      this.middlewares.validatePathId,
      this.middlewares.validateBody(this.validators.carValidator),
      this.controller.update,
    );
  }

  public initAgain(): void { // Just for lint issues
    this.router.delete(
      '/:id',
      this.middlewares.validatePathId,
      this.controller.delete,
    );
  }
}

export const againstDefaultExport = '';