import { IFactory, Factory } from 'rosie';
import { lorem } from 'faker'

class CategoryFactory {
  factory: IFactory<any>;

  constructor(factory?: rosie.IFactory<any>) {
    const defaultFactory = new Factory().attr('name', lorem.word);
    this.factory = factory ? factory : defaultFactory;
  }

  public build() {
    return this.factory.build();
  }

  public buildList() {
    return this.factory.buildList();
  }
}

