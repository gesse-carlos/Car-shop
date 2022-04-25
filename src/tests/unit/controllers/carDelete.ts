import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon'
import { CarController } from '../../../controllers'
import { CarService } from '../../../services'

describe('Testing delete function in CarController', () => {
  class MockCarService extends CarService{
    delete = sinon.stub()
      .onCall(0).resolves()
      .onCall(1).resolves('You deleted a Corsa')
      .onCall(2).resolves(null)
  }
  const mockCarService = new MockCarService({} as any)

  const carController = new CarController(mockCarService)

  const mockReq = {} as Request
  const mockRes = {} as Response

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes)
    mockRes.json = sinon.stub().returns(undefined)
    mockRes.end = sinon.stub().returns(undefined)
  })

  mockReq.params = { id: '6254b6f0935a9c5f58a8e71a' }

  it('Should call delete with request body', async () => {
    await carController.delete(mockReq, mockRes);
    expect(mockCarService.delete.calledWith(mockReq.params.id)).to.be.true
  })

  describe('When a car is found', () => {
    it('Should return code 204 and response end without arguments', async () => {
      await carController.delete(mockReq, mockRes);
      expect((mockRes.status as SinonStub).calledWith(204)).to.be.true
      expect((mockRes.end as SinonStub).calledWith()).to.be.true
    });
  })

  describe('When a car is not found', () => {
    it('Should return code 404 and response with "Item not found"', async () => {
      await carController.delete(mockReq, mockRes);
      expect((mockRes.status as SinonStub).calledWith(404)).to.be.true
      expect((mockRes.json as SinonStub).calledWith({ error: 'Object not found' })).to.be.true
    });
  })
})