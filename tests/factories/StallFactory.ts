import rosie, { Factory } from 'rosie';
import { lorem } from 'faker';
import HawkerCentreFact from './HawkerCentreFactory';
import Stall from '../../src/models/Stall';
import BaseFactory from './BaseFactory';

class StallFactory extends BaseFactory {
  // private static fact = new Factory()
  //   .attr('name', lorem.words)
  //   .attr('HawkerCentre', HawkerCentreFact.build());

  constructor(factory?: rosie.IFactory<any>) {
    const defaultFactory = new Factory()
      .attr('name', lorem.words)
      .attr('HawkerCentre', HawkerCentreFact.build());
    // this.factory = factory ? factory : defaultFactory;
    super(factory ? factory : defaultFactory);
  }

  categories() {
    return new StallFactory(new Factory().extend(this.factory).attr('Categories', ['abc', 'def']));
  }

  reviews() {
    return new StallFactory(
      new Factory().extend(this.factory).attr('Reviews', ['review1', 'review2'])
    );
  }

  all() {
    return this.categories().reviews();
  }

  public getInclude() {
    return [
      { association: Stall.associations.HawkerCentre, include: HawkerCentreFact.getInclude() },
    ];
  }

  // public build() {
  //   return this.factory.build();
  // }

  public create(): Promise<Stall> {
    // return Stall.create(this.build(), { include: StallFactory.getInclude() });
    return Stall.create(this.build(), { include: { all: true, nested: true } });
  }
}

export default new StallFactory();

// export const stallFactory = new Factory()
//   .attr('name', lorem.words)
//   .attr('HawkerCentre', HawkerCentreFact.build());

// export const stallWithImages = stallFactory.attr('Images', ['abc', 'def']);
// export const stallWithCategories = stallFactory.attr('Categories', ['abc', 'def']);
// export const stallWithReviews = stallFactory.attr('Reviews', ['review1', 'review2']);
// export const stallWithAll = stallFactory.extend(stallWithCategories).extend(stallWithReviews);

// export function createWithAll(asdf: any, ) {
//   Stall.create(asdf, );
// }