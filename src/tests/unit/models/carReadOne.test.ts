import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import mongoose, { Model } from 'mongoose';
import { CarModel, carSchema } from '../../../models';

describe('Testing readOne function in CarModel', () => {
  let carModel: CarModel;
  let mongooseModel: Model<any>;

  before(() => {
    sinon.stub(mongoose, 'model').returns({
      findById: sinon.stub().resolves('This is the Corsa that you search'),
    })

    mongooseModel = mongoose.model('Car', carSchema);
    carModel = new CarModel(mongooseModel);
  })

  after(() => {
    (mongoose.model as any).restore();
  })

  it('Should call findById function using the car id', async () => {
    await carModel.readOne('this is an id');
    expect((mongooseModel.findById as SinonStub).calledWith('this is an id')).to.be.true
  })

  it('Should return what find returns', async () => {
    const result = await carModel.readOne('this is an id');
    expect(result).to.be.equal('This is the Corsa that you search');
  });
})