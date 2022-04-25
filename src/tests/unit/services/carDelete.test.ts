import { expect } from 'chai';
import sinon from 'sinon'
import { CarService } from '../../../services'
import { CarModel } from '../../../models'

describe('Testing delete function in CarService', () => {
  class MockCarModel extends CarModel{
    delete = sinon.stub().resolves('You deleted a Corsa')
  }
  const mockCarModel = new MockCarModel({} as any)

  const carService = new CarService(mockCarModel)

  it('Should call delete without arguments', async () => {
    await carService.delete('id');
    expect(mockCarModel.delete.calledWith('id')).to.be.true
  })

  it('Should return what delete returns', async () => {
    const result = await carService.delete('id');
    expect(result).to.be.equal('You deleted a Corsa');
  });
})