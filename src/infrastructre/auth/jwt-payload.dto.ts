import { Request } from 'express';

export type JwtPayloadDto = {
  id: number;
  username: string;
  role: string;
};

export interface AuthenticatedRequest extends Request {
  user: JwtPayloadDto;
}
