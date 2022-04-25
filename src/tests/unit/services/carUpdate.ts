import { expect } from 'chai';
import sinon from 'sinon'
import { CarService } from '../../../services'
import { CarModel } from '../../../models'

describe('Testing update function in CarModel', () => {
  class MockCarModel extends CarModel{
    update = sinon.stub().resolves('Corsa updated')
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

  it('Should call update without arguments', async () => {
    await carService.update('id', carPayload);
    expect(mockCarModel.update.calledWith('id')).to.be.true
  })

  it('Should return what update returns', async () => {
    const result = await carService.update('id', carPayload);
    expect(result).to.be.equal('Corsa updated');
  });
})