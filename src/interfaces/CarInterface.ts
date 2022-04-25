import { IVehicle } from './VehicleInterface';

export interface ICar extends IVehicle {
  doorsQty: number
  seatsQty: number
}