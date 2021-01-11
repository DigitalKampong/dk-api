import { IFactory, Factory } from 'rosie';
import { lorem } from 'faker';
import BaseFactory from './BaseFactory';
import RegionFact from './RegionFactory';
import HawkerCentre from '../../src/models/HawkerCentre';

class HawkerCentreFactory extends BaseFactory<HawkerCentre> {
  private static defaultFactory = new Factory()
    .attr('name', () => lorem.words())
    .attr('Region', () => RegionFact.build());

  constructor(fact?: IFactory<HawkerCentre>) {
    super(HawkerCentreFactory.defaultFactory, HawkerCentre, fact);
  }
}

export default new HawkerCentreFactory();
