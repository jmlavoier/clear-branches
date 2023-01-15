import { BranchesList } from '../@types/domains';

export function force (value: string): BranchesList {
  const consideringBranches = value.split(',');

  return [...consideringBranches];
}
