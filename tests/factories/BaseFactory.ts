/* eslint-disable @typescript-eslint/no-explicit-any */

import { IFactory } from 'rosie';
import { CreateOptions } from 'sequelize/types';

interface StaticModel<T> {
  create(values?: T, options?: CreateOptions): Promise<T>;
}

class BaseFactory<T = any> {
  factory: IFactory<T>;
  clazz: StaticModel<T>;

  constructor(factory: IFactory<T>, clazz: StaticModel<T>) {
    this.factory = factory;
    this.clazz = clazz;
  }

  build(attributes?: { [k in keyof T]?: T[k] }, options?: any): T {
    return this.factory.build(attributes, options);
  }

  buildList(size: number, attributes?: { [k in keyof T]?: T[k] }, options?: any): T[] {
    return this.factory.buildList(size, attributes, options);
  }

  create(options?: CreateOptions): Promise<T> {
    const opts: CreateOptions = options ? options : { include: { all: true, nested: true } };
    return this.clazz.create(this.build(), opts);
  }
}

export default BaseFactory;
