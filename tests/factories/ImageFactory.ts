import { IFactory, Factory } from 'rosie';
import { random } from 'faker';
import BaseFactory from './BaseFactory';
import { Image } from '../../src/models';

class ImageFactory extends BaseFactory<Image> {
  private static defaultFactory = new Factory().attr('fileName', () => `${random.uuid()}.jpeg`);

  constructor(fact?: IFactory<Image>) {
    super(ImageFactory.defaultFactory, Image, fact);
  }
}

export default new ImageFactory();
