import { IFactory, Factory } from 'rosie';
import { lorem } from 'faker';
import BaseFactory from './BaseFactory';
import Category from '../../src/models/Category';

class CategoryFactory extends BaseFactory<Category> {
  private static defaultFactory = new Factory().attr('name', () => lorem.word());

  constructor(fact?: IFactory) {
    super(CategoryFactory.defaultFactory, Category, fact);
  }
}

export default new CategoryFactory();
