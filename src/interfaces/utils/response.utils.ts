import { HttpStatus } from '@nestjs/common';

export function OK<T>(message: string, data?: T) {
  return {
    success: true,
    statusCode: HttpStatus.OK,
    message,
    data,
  };
}

export function BadRequest<T>(message: string, data?: T) {
  return {
    success: false,
    statusCode: HttpStatus.BAD_REQUEST,
    message,
    data,
  };
}
