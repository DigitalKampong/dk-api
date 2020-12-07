import {Factory} from 'rosie';
import {lorem} from 'faker';
import HawkerCentreFact from './HawkerCentreFactory';
import Stall from '../../src/models/Stall';

export default class StallFactory {
  private static fact = new Factory()
    .attr('name', lorem.words)
    .attr('HawkerCentre', HawkerCentreFact.build());

  public static getInclude() {
    return [{association: Stall.associations.HawkerCentre, include: HawkerCentreFact.getInclude()}];
  }

  public static build() {
    return StallFactory.fact.build();
  }

  public static create(): Promise<Stall> {
    return Stall.create(this.build(), {include: StallFactory.getInclude()});
  }
}
