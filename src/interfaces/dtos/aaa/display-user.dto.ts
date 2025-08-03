// user.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { DisplayTriggerDto } from '../trigger/display-trigger.dto';
import { DisplayNotificationDto } from '../notification/display-notification.dto';
import { DisplayTriggerUserMapDto } from '../trigger-user-map/display-trigger-user-map.dto';
import { IsOptional } from 'class-validator';

export class DisplayUserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  role: string;

  @ApiProperty({ type: () => [DisplayTriggerDto] }) // if you have a nested DTO
  @IsOptional()
  triggers?: DisplayTriggerDto[]; // ideally: TriggerDto[]

  @ApiProperty({ type: () => [DisplayNotificationDto] })
  @IsOptional()
  notifications?: DisplayNotificationDto[];

  @ApiProperty({ type: () => [DisplayTriggerUserMapDto] })
  @IsOptional()
  triggerMap?: DisplayTriggerUserMapDto[];
}
