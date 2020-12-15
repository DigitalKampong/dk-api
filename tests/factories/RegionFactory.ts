import { Factory } from 'rosie';
import { lorem } from 'faker';
import Region from '../../src/models/Region';

export default class RegionFactory {
  private static fact = new Factory().attr('name', lorem.words);

  public static getInclude() {
    return [];
  }

  public static build() {
    return RegionFactory.fact.build();
  }

  public static create(): Promise<Region> {
    return Region.create(this.build());
  }
}
