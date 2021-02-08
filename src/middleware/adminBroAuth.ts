import { UnauthorizedError } from '../errors/httpErrors';

const ADMIN_BRO_CRED = {
  email: 'test@example.com',
  password: 'password',
};

const adminBroAuth = (email: string, password: string) => {
  if (ADMIN_BRO_CRED.password !== password || ADMIN_BRO_CRED.email !== email)
    throw new UnauthorizedError('Invalid Admin Credentials!');

  return ADMIN_BRO_CRED;
};

export default adminBroAuth;
