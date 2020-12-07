import {Factory} from 'rosie';
import {lorem} from 'faker';
import RegionFact from './RegionFactory';
import HawkerCentre from '../../src/models/HawkerCentre';

export default class HawkerCentreFactory {
  private static fact = new Factory().attr('name', lorem.words).attr('Region', RegionFact.build());

  public static getInclude() {
    return [{association: HawkerCentre.associations.Region, include: RegionFact.getInclude()}];
  }

  public static build() {
    return HawkerCentreFactory.fact.build();
  }

  public static create(): Promise<HawkerCentre> {
    return HawkerCentre.create(this.build(), {include: HawkerCentreFactory.getInclude()});
  }
}
