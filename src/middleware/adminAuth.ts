const ADMIN = {
  email: 'test@example.com',
  password: 'password',
};

const adminAuth = (email, password) => {
  if (ADMIN.password === password && ADMIN.email === email) {
    return ADMIN;
  }
  return null;
};

export default adminAuth;
