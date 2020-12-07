import {Association} from 'sequelize';
import {Factory} from 'rosie';

export default abstract class BaseFactory<T> {
  public static abstract getInclude(): Association[];
  public static abstract build(): Factory;
  public static abstract create(): Promise<T>;
}
