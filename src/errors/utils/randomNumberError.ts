export class RandomNumberError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RandomNumberError";
  }
}
