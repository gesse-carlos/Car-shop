import { expect } from 'chai';
import sinon from 'sinon'
import { CarService } from '../../../services'
import { CarModel } from '../../../models'

describe('Testing delete function in CarService', () => {
  class MockCarModel extends CarModel{
    read = sinon.stub().resolves('This is all Corsas we have')
  }
  const mockCarModel = new MockCarModel({} as any)

  const carService = new CarService(mockCarModel)

  it('Should call read function without arguments', async () => {
    await carService.read();
    expect(mockCarModel.read.calledWith()).to.be.true
  })

  it('Should return what read returns', async () => {
    const result = await carService.read();
    expect(result).to.be.equal('This is all Corsas we have');
  });
})