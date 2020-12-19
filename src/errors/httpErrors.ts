export class HTTPError extends Error {
  status: number;

  constructor(message: string, name: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}
