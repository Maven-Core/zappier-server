import { ApiProperty } from '@nestjs/swagger';
import { DisplayUserDto } from '../aaa/display-user.dto';
import { DisplayTriggerUserMapDto } from '../trigger-user-map/display-trigger-user-map.dto';
import { DisplayNotificationDto } from '../notification/display-notification.dto';

export class DisplayTriggerDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  external_id: string;

  @ApiProperty()
  created_by: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty({ type: () => DisplayUserDto })
  creator: DisplayUserDto;

  @ApiProperty({ type: () => [DisplayTriggerUserMapDto] })
  userMaps: DisplayTriggerUserMapDto[];

  @ApiProperty({ type: () => [DisplayNotificationDto] })
  notifications: DisplayNotificationDto[];
}
