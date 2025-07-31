import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { NotificationService } from '../../modules/notification/notification.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from '../dtos/notification/create-notification.dto';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly service: NotificationService) {}

  @Post()
  @ApiBody({ type: CreateNotificationDto })
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number) {
    return this.service.findByUser(userId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.service.markAsRead(Number(id));
  }
}
