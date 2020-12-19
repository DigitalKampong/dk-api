export class HTTPError extends Error {
  status: number;

  constructor(message: string, name: string, status: number) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 'BadRequestError', 400);
  }
}

export class UnauthorizedError extends HTTPError {
  constructor(message: string) {
    super(message, 'UnauthorizedError', 401);
  }
}

export class ForbiddenError extends HTTPError {
  constructor(message: string) {
    super(message, 'ForbiddenError', 403);
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 'NotFoundError', 404);
  }
}

export class UploadFileError extends HTTPError {
  constructor(filename: string, err: Error) {
    const msg = `${filename}: ${err.name}: ${err.message}`;
    super(msg, 'UploadFileError', 400);
  }
}
