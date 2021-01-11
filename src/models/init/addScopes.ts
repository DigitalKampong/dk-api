import { ModelStatic } from '../../types';

export function addScopes(models: { [Key: string]: ModelStatic }) {
  const { Stall } = models;

  Stall.addScope('defaultScope', { include: [{ association: Stall.associations.Categories }] });
}
