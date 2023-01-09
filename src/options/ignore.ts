export function ignore(value: string, previous: any) {
  const ignoringBranches = value.split(',');

  return [...ignoringBranches]
}