import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDto<T = any> {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  data?: T;
  @ApiProperty()
  statusCode?: number;
}

export function ApiResponseDtoOf(input: any): any {
  const isArray = Array.isArray(input);
  const type = isArray ? input[0] : input;
  const name = type.name;

  class CustomResponseDto extends ApiResponseDto<any> {
    @ApiProperty({ type, isArray, required: false })
    declare data?: any;
  }

  // Dynamically Set Name: ARDD = ApiResponseDisplayDto
  Object.defineProperty(CustomResponseDto, 'name', {
    value: `ARDD_${name}${isArray ? 'Array' : ''}`,
  });

  return CustomResponseDto;
}

/* export function ApiResponseDtoOf<T>(classRef: new () => T) {
  class ResponseDto extends ApiResponseDto<T> {
    @ApiProperty({ type: classRef, required: false })
    declare data?: T;
  }
  return ResponseDto;
}
 */
