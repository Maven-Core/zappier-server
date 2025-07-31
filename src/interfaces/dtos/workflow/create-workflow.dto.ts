// src/workflow/dto/create-workflow.dto.ts
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkflowDto {
  @ApiProperty({ example: 'Lead → Email Campaign' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'google_sheets_new_row' })
  @IsString()
  trigger: string;

  @ApiProperty({ example: 'sendgrid_email' })
  @IsString()
  action: string;
}
