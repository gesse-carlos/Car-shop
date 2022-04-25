import { expect } from 'chai';
import sinon, { SinonStub } from 'sinon'
import mongoose, { Model } from 'mongoose';
import { CarModel, carSchema } from '../../../models';

describe('Testing delete function in CarModel', () => {
  let carModel: CarModel;
  let mongooseModel: Model<any>;

  before(() => {
    sinon.stub(mongoose, 'model').returns({
      findByIdAndDelete: sinon.stub().resolves('You deleted a Corsa'),
    })

    mongooseModel = mongoose.model('Car', carSchema);
    carModel = new CarModel(mongooseModel);
  })

  after(() => {
    (mongoose.model as any).restore();
  })

  it('Should call findByIdAndDelete function using car data specified by id', async () => {
    await carModel.delete('id');
    expect((mongooseModel.findByIdAndDelete as SinonStub).calledWith('id')).to.be.true
  })

  it('Should return what findByIdAndDelete returns', async () => {
    const result = await carModel.delete('id');
    expect(result).to.be.equal('You deleted a Corsa');
  });
})