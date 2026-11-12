export function getDecadeLabel(year: number): string {
  return `${Math.floor(year / 10) * 10}er`;
}
