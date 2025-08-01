import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { NotificationService } from '../../modules/notification/notification.service';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from '../dtos/notification/create-notification.dto';
import { DisplayNotificationDto } from '../dtos/notification/display-notification.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  @ApiBody({ type: CreateNotificationDto })
  @ApiOkResponse({ type: DisplayNotificationDto })
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  @ApiOkResponse({ type: [DisplayNotificationDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: [DisplayNotificationDto] })
  findByUser(@Param('userId') userId: number) {
    return this.service.findByUser(userId);
  }

  @Patch(':id/read')
  @ApiOkResponse({ type: DisplayNotificationDto })
  markAsRead(@Param('id') id: string) {
    return this.service.markAsRead(Number(id));
  }
}
