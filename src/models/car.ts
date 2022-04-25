import { Schema, Document } from 'mongoose';
import { MongoModel } from './abstract';
import { ICar } from '../interfaces';

interface CarDocument extends ICar, Document {}

export const carSchema = new Schema<CarDocument>({
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
}, {
  collection: 'Cars',
  versionKey: false,
});

export class CarModel extends MongoModel<ICar> {}