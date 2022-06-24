import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon'
import { CarController } from '../../../controllers'
import { CarService } from '../../../services'

describe('Testing create function in CarController', () => {
  class MockCarService extends CarService{
    create = sinon.stub().resolves('This is a new Corsa')
  }
  const mockCarService = new MockCarService({} as any)

  const carController = new CarController(mockCarService)

  const mockReq = {} as Request
  const mockRes = {} as Response

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes)
    mockRes.json = sinon.stub().returns(undefined)
  })

  mockReq.body = {
    model: 'Corsa',
    year: 2000,
    color: 'blue',
    status: true,
    buyValue: 1000,
    doorsQty: 4,
    seatsQty: 4,
  };

  it('Should call create function with request body', async () => {
    await carController.create(mockReq, mockRes);
    expect(mockCarService.create.calledWith(mockReq.body)).to.be.true
  })

  it('Should return code 201 and response create function returns', async () => {
    await carController.create(mockReq, mockRes);
    expect((mockRes.status as SinonStub).calledWith(201)).to.be.true
    expect((mockRes.json as SinonStub).calledWith('This is a new Corsa')).to.be.true
  });
})