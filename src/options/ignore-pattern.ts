export function ignorePattern(value: string, previous: any) {
  const ignoringBranches = value.split(',');

  return [...ignoringBranches]
}