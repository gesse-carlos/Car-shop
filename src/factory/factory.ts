import { model as createModel } from 'mongoose';
import { Router } from 'express';
import * as middlewares from '../middlewares';
import * as validators from '../validators';
import { carSchema, CarModel } from '../models';
import { CarService } from '../services';
import { CarController } from '../controllers';
import { CarRouter } from '../routes';

class RoutersFactory {
  public static createCarsRouter(): Router {
    const carModel = new CarModel(createModel('Car', carSchema));
    const carService = new CarService(carModel);
    const carController = new CarController(carService);
    const carRouter = new CarRouter(carController, middlewares, validators);
    return carRouter.router;
  }
}

export const carRouter = RoutersFactory.createCarsRouter();

export const againstDefaultExport = '';