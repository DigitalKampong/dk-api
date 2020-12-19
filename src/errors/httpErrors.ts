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

export class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400);
  }
}

export class UploadFileError extends HTTPError {
  constructor(filename: string, err: Error) {
    const msg = `${filename}: ${err.name}: ${err.message}`;
    super(msg, 'UploadFileError', 400);
  }
}
