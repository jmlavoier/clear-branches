import { BranchesList } from '../@types/domains';

export function consider (value: string): BranchesList {
  const consideringBranches = value.split(',');

  return [...consideringBranches];
}
