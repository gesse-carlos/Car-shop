import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import mongoose, { Model } from 'mongoose';
import { CarModel, carSchema } from '../../../models';

describe('Testing update function in CarModel', () => {
  let carModel: CarModel;
  let mongooseModel: Model<any>;

  before(() => {
    sinon.stub(mongoose, 'model').returns({
      findByIdAndUpdate: sinon.stub().resolves('Corsa updated'),
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

  it('Should call create function using car id and data', async () => {
    await carModel.update('id', carPayload);
    expect((mongooseModel.findByIdAndUpdate as SinonStub).calledWith('id', carPayload)).to.be.true
  })

  it('Should return what create findByIdAndUpdate returns', async () => {
    const result = await carModel.update('id', carPayload);
    expect(result).to.be.equal('Corsa updated');
  });
})