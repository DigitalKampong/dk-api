import { IFactory, Factory } from 'rosie';
import { lorem } from 'faker';
import { Region } from '../../src/models';
import BaseFactory from './BaseFactory';

class RegionFactory extends BaseFactory<Region> {
  private static defaultFactory = new Factory().attr('name', () => lorem.words());

  constructor(fact?: IFactory<Region>) {
    super(RegionFactory.defaultFactory, Region, fact);
  }
}

export default new RegionFactory();
