import { expect } from 'chai';
import sinon from 'sinon'
import { CarService } from '../../../services'
import { CarModel } from '../../../models'

describe('Testing readOne function in CarService', () => {
  class MockCarModel extends CarModel{
    readOne = sinon.stub().resolves('This is the Corsa that you search')
  }
  const mockCarModel = new MockCarModel({} as any)

  const carService = new CarService(mockCarModel)

  it('Should call readOne without arguments', async () => {
    await carService.readOne('id');
    expect(mockCarModel.readOne.calledWith('id')).to.be.true
  })

  it('Should return what readOne returns', async () => {
    const result = await carService.readOne('id');
    expect(result).to.be.equal('This is the Corsa that you search');
  });
})