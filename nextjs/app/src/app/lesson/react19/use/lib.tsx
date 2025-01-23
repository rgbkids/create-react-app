export function fetchMessage(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve('Hello'), 3000));
}
