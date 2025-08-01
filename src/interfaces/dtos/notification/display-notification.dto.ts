import { ApiProperty } from '@nestjs/swagger';
import { DisplayUserDto } from '../aaa/display-user.dto';
import { DisplayTriggerDto } from '../trigger/display-trigger.dto';

export class DisplayNotificationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  trigger_id: number;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  metadata?: any; // Or `Record<string, any>` if you want stricter typing

  @ApiProperty()
  is_read: boolean;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ type: () => DisplayUserDto })
  user: DisplayUserDto;

  @ApiProperty({ type: () => DisplayTriggerDto })
  trigger: DisplayTriggerDto;
}
