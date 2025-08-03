import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateNotificationDto } from '../dtos/notification/create-notification.dto';
import { DisplayNotificationDto } from '../dtos/notification/display-notification.dto';
import { NotificationHandler } from '../handlers/notificationHandler';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationController {
  constructor(private readonly handler: NotificationHandler) {}

  @Post()
  @ApiBody({ type: CreateNotificationDto })
  @ApiOkResponseDto(DisplayNotificationDto)
  create(@Body() body: CreateNotificationDto) {
    return this.handler.executeCreateCommand(body);
  }

  @Get()
  @ApiOkResponseDto([DisplayNotificationDto])
  findAll() {
    return this.handler.executeFindAllQuery();
  }

  @Get('user/:userId')
  @ApiOkResponseDto([DisplayNotificationDto])
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.handler.executeFindByUserQuery(userId);
  }

  @Delete('/:id')
  @ApiOkResponseDto()
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.handler.executeDeleteCommand(id);
  }

  @Patch(':id/read')
  @ApiOkResponseDto(DisplayNotificationDto)
  markAsRead(@Param('id', ParseIntPipe) id: number) {
    return this.handler.executeMarkAsReadCommand(id);
  }
}
