import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET as string,
  audience: process.env.JWT_TOKEN_AUDIENCE as string,
  issuer: process.env.JWT_TOKEN_ISSUER as string,
  expiresIn: process.env.JWT_TTL as string,
}));
