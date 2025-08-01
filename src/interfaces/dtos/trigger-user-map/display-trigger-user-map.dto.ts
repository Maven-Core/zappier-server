import { ApiProperty } from '@nestjs/swagger';
import { DisplayTriggerDto } from '../trigger/display-trigger.dto';
import { DisplayUserDto } from '../aaa/display-user.dto';

export class DisplayTriggerUserMapDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  trigger_id: number;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  assigned_at: Date;

  @ApiProperty({ type: () => DisplayUserDto })
  user: DisplayUserDto;

  @ApiProperty({ type: () => DisplayTriggerDto })
  trigger: DisplayTriggerDto;
}
