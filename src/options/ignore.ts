import { BranchesList } from '../@types/domains';

export function ignore (value: string, previous: any): BranchesList {
  const ignoringBranches = value.split(',');

  return [...ignoringBranches]
}
