import { BranchesList } from '../@types/domains';

export function ignorePattern (value: string, previous: any): BranchesList {
  const ignoringBranches = value.split(',');

  return [...ignoringBranches]
}
