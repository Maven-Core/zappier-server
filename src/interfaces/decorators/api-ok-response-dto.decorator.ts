import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  ApiResponseDto,
  ApiResponseDtoOf,
} from '../dtos/base/api-response-dto';

export function ApiOkResponseDto(typeOrArray?: any) {
  return applyDecorators(
    ApiOkResponse({
      type: typeOrArray ? ApiResponseDtoOf(typeOrArray) : ApiResponseDto,
    }),
  );
}
