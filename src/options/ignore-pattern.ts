export function ignorePattern (value: string): RegExp {
  const pattern = new RegExp(value);

  return pattern;
}
