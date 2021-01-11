import { IFactory, Factory } from 'rosie';
import { lorem } from 'faker';
import HawkerCentreFact from './HawkerCentreFactory';
import Stall from '../../src/models/Stall';
import BaseFactory from './BaseFactory';
import CategoryFactory from './CategoryFactory';
import ReviewFactory from './ReviewFactory';
import ImageFactory from './ImageFactory';

class StallFactory extends BaseFactory<Stall> {
  private static defaultFactory = new Factory()
    .attr('name', () => lorem.words())
    .attr('HawkerCentre', () => HawkerCentreFact.build());

  constructor(fact?: IFactory<Stall>) {
    super(StallFactory.defaultFactory, Stall, fact);
  }

  withCategories() {
    return new StallFactory(
      new Factory().extend(this.factory).attr('Categories', () => CategoryFactory.buildList(2))
    );
  }

  withReviews() {
    // ReviewFactory.build() will have Stall key in atttribute too. Apparently, sequelize is smart enough
    // not to save that into the db and use the original Stall.
    return new StallFactory(
      new Factory().extend(this.factory).attr('Reviews', () => ReviewFactory.buildList(2))
    );
  }

  withImages() {
    return new StallFactory(
      new Factory().extend(this.factory).attr('Images', () => ImageFactory.buildList(2))
    );
  }

  withAll() {
    return this.withCategories().withReviews().withImages();
  }
}

export default new StallFactory();
