import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon'
import { CarController } from '../../../controllers'
import { CarService } from '../../../services'

describe('Testing read function in CarController', () => {
  class MockCarService extends CarService{
    read = sinon.stub().resolves('This is all Corsas we have')
  }
  const mockCarService = new MockCarService({} as any)

  const carController = new CarController(mockCarService)

  const mockReq = {} as Request
  const mockRes = {} as Response

  beforeEach(() => {
    mockRes.status = sinon.stub().returns(mockRes)
    mockRes.json = sinon.stub().returns(undefined)
  })

  it('Should call read with request body', async () => {
    await carController.read(mockReq, mockRes);
    expect(mockCarService.read.calledWith()).to.be.true
  })

  it('Should return code 200 and response with what read resolves', async () => {
    await carController.read(mockReq, mockRes);
    expect((mockRes.status as SinonStub).calledWith(200)).to.be.true
    expect((mockRes.json as SinonStub).calledWith('This is all Corsas we have')).to.be.true
  });
})