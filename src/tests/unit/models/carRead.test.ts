import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import mongoose, { Model } from 'mongoose';
import { CarModel, carSchema } from '../../../models';

describe('Testing delete function in CarModel', () => {
  let carModel: CarModel;
  let mongooseModel: Model<any>;

  before(() => {
    sinon.stub(mongoose, 'model').returns({
      find: sinon.stub().resolves('This is all Corsas we have'),
    })

    mongooseModel = mongoose.model('Car', carSchema);
    carModel = new CarModel(mongooseModel);
  })

  after(() => {
    (mongoose.model as any).restore();
  })

  it('Should call find function without arguments', async () => {
    await carModel.read();
    expect((mongooseModel.find as SinonStub).calledWith()).to.be.true
  })

  it('Should return what find returns', async () => {
    const result = await carModel.read();
    expect(result).to.be.equal('This is all Corsas we have');
  });
})