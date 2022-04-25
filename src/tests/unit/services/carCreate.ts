import { expect } from 'chai';
import sinon from 'sinon'
import { CarService } from '../../../services'
import { CarModel } from '../../../models'

describe('Testing create function in CarServices', () => {
  class MockCarModel extends CarModel{
    create = sinon.stub().resolves('This is a new Corsa')
  }
  const mockCarModel = new MockCarModel({} as any)

  const carService = new CarService(mockCarModel)

  const carPayload = {
    model: 'Corsa',
    year: 2000,
    color: 'blue',
    status: true,
    buyValue: 1000,
    doorsQty: 4,
    seatsQty: 4,
  };

  it('Should call create function using car data', async () => {
    await carService.create(carPayload);
    expect(mockCarModel.create.calledWith(carPayload)).to.be.true
  })

  it('Should return what create function returns', async () => {
    const result = await carService.create(carPayload);
    expect(result).to.be.equal('This is a new Corsa');
  });
})