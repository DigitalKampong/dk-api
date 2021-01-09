import rosie, { IFactory, Factory } from 'rosie';

class BaseFactory {
  factory: IFactory<any>

  constructor(factory: IFactory<any>) {
    this.factory = factory;
  }

  build() {
    return this.factory.build();
  }

  buildList() {
    return this.factory.buildList(3);
  }
}

export default BaseFactory;