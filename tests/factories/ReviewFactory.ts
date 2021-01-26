import { IFactory, Factory } from 'rosie';
import { random } from 'faker';
import BaseFactory from './BaseFactory';
import { Review } from '../../src/models';
import UserFactory from './UserFactory';
import StallFactory from './StallFactory';

class ReviewFactory extends BaseFactory<Review> {
  private static defaultFactory = new Factory()
    .attr('rating', () => random.number(5))
    .attr('User', () => UserFactory.build())
    .attr('Stall', () => StallFactory.build());

  constructor(fact?: IFactory) {
    super(ReviewFactory.defaultFactory, Review, fact);
  }
}

export default new ReviewFactory();
