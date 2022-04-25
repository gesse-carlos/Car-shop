import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon'
import { CarController } from '../../../controllers'
import { CarService } from '../../../services'

describe('Testing update function in CarController', () => {
  class MockCarService extends CarService{
    update = sinon.stub()
      .onCall(0).resolves()
      .onCall(1).resolves('Corsa updated')
      .onCall(2).resolves(null)
  }
  const mockCarService = new MockCarService({} as any)

  const carController = new CarController(mockCarService)

  const mockReq = {} as Request
  const mockRes = {} as Response

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes)
    mockRes.json = sinon.stub().returns(undefined)
  })

  mockReq.params = { id: '6254b6f0935a9c5f58a8e71a' }

  mockReq.body = {
    model: 'Corsa',
    year: 2000,
    color: 'blue',
    status: true,
    buyValue: 1000,
    doorsQty: 4,
    seatsQty: 4,
  };

  it('Should call carService update with req.body', async () => {
    await carController.update(mockReq, mockRes);
    expect(mockCarService.update.calledWith(mockReq.params.id, mockReq.body)).to.be.true
  })

  describe('When a car is found', () => {
    it('Should return code 200 and response with what update resolves', async () => {
      await carController.update(mockReq, mockRes);
      expect((mockRes.status as SinonStub).calledWith(200)).to.be.true
      expect((mockRes.json as SinonStub).calledWith('Corsa updated')).to.be.true
    });
  })

  describe('When a car is not found', () => {
    it('Should return code 404 and response "Item not found"', async () => {
      await carController.update(mockReq, mockRes);
      expect((mockRes.status as SinonStub).calledWith(404)).to.be.true
      expect((mockRes.json as SinonStub).calledWith({ error: 'Object not found' })).to.be.true
    });
  })
})