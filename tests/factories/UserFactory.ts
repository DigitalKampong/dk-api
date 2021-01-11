import { IFactory, Factory } from 'rosie';
import { internet } from 'faker';
import BaseFactory from './BaseFactory';
import User from '../../src/models/User';

class UserFactory extends BaseFactory<User> {
  private static defaultFactory = new Factory()
    .attr('email', () => internet.email())
    .attr('password', () => internet.password());

  constructor(fact?: IFactory) {
    super(UserFactory.defaultFactory, User, fact);
  }
}

export default new UserFactory();
