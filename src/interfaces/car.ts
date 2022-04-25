import { IVehicle } from './vehicle';

export interface ICar extends IVehicle {
  doorsQty: number
  seatsQty: number
}