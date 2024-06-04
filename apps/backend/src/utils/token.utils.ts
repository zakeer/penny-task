
import * as crypto from 'crypto';
import { AUTH } from '../constants';

export const generateResetToken = (): string => {
  return crypto.randomBytes(AUTH.TOKEN_BYTES).toString(AUTH.TOKEN_TYPE as BufferEncoding);
};
