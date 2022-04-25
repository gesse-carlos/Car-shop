import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import mongoose, { Model } from 'mongoose';
import { CarModel, carSchema } from '../../../models';

describe('Testing create function in CarModel', () => {
  let carModel: CarModel;
  let mongooseModel: Model<any>;

  before(() => {
    sinon.stub(mongoose, 'model').returns({
      create: sinon.stub().resolves('This is a new Corsa'),
    })

    mongooseModel = mongoose.model('Car', carSchema);
    carModel = new CarModel(mongooseModel);
  })

  after(() => {
    (mongoose.model as any).restore();
  })

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
    await carModel.create(carPayload);
    expect((mongooseModel.create as SinonStub).calledWith(carPayload)).to.be.true
  })

  it('Should return what create function returns', async () => {
    const result = await carModel.create(carPayload);
    expect(result).to.be.equal('This is a new Corsa');
  });
})