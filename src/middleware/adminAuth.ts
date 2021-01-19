import { UnauthorizedError } from '../errors/httpErrors';

import { UnauthorizedError } from '../errors/httpErrors';

const ADMIN = {
  email: 'test@example.com',
  password: 'password',
};

const adminAuth = (email: string, password: string) => {
  if (ADMIN.password !== password || ADMIN.email !== email)
    throw new UnauthorizedError('Invalid Admin Credentials!');

  return ADMIN;
};

export default adminAuth;
