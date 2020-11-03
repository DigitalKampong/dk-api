import {Factory} from 'rosie';
import {lorem} from 'faker';
import HawkerCentreFact from './HawkerCentreFactory';
import Stall from '../../src/models/Stall';

export default class StallFactory {
  private static fact = new Factory()
    .attr('name', lorem.words)
    .attr('HawkerCentre', HawkerCentreFact.build());

  public static getIncludes() {
    return [{association: Stall.HawkerCentre, include: HawkerCentreFact.getInclude()}];
  }

  public static build() {
    return StallFactory.fact.build();
  }

  public static create(): Promise<Stall> {
    return Stall.create(this.build(), {include: StallFactory.getIncludes()});
  }
}
