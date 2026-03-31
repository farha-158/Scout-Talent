import { randomBytes } from 'crypto';

export const generateToken = () => {
  const token = randomBytes(32).toString('hex');

  return token;
};
