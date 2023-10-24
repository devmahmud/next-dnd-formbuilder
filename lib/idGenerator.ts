export function idGenerator(): string {
  return Math.floor(Math.random() * 10001).toString();
}
