import { IFactory, Factory } from 'rosie';
import { lorem } from 'faker';
import Category from '../../src/models/Category';
import BaseFactory from './BaseFactory';

class CategoryFactory extends BaseFactory<Category> {
  private static defaultFactory = new Factory().attr('name', lorem.word);

  constructor(fact?: IFactory) {
    const factory = fact ? fact : CategoryFactory.defaultFactory;
    super(factory, Category);
  }
}

export default new CategoryFactory();
