import { User } from '@/lib/models/user';
import jwt from 'jsonwebtoken';

export const protect = async (auth) => {
  let token;

  if (auth && auth.startsWith('Bearer')) {
    try {
      token = auth.split(' ')[1];

      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      if (decoded) {
        return await decoded;
      } else {
        return await false;
      }
    } catch (error) {
      return await false;
    }
  }

  if (!token) {
    return await false;
  }
};
