export function consider(value: string) {
  const consideringBranches = value.split(',');
  
  return [...consideringBranches];
}