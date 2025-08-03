import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/modules/notification/notification.service';
import { CreateNotificationDto } from '../dtos/notification/create-notification.dto';
import { ApiResponseDto } from '../dtos/base/api-response-dto';
import { DisplayNotificationDto } from '../dtos/notification/display-notification.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class NotificationHandler {
  constructor(private readonly service: NotificationService) {}

  async executeCreateCommand(
    createDto: CreateNotificationDto,
  ): Promise<ApiResponseDto<DisplayNotificationDto>> {
    try {
      const newNotification = await this.service.create(createDto);
      return {
        success: true,
        message: 'Notification created successfully',
        data: plainToInstance(DisplayNotificationDto, newNotification),
      };
    } catch (error: any) {
      return {
        message: error.message || 'Failed to create mapping',
        success: false,
      };
    }
  }

  async executeDeleteCommand(id: number): Promise<ApiResponseDto> {
    try {
      await this.service.delete(id);
      return { message: 'Deleted successfully', success: true };
    } catch (error: any) {
      // If the error code is 'P2025' (e.g., record not found), treat as success (idempotent delete)
      if (error.code === 'P2025') {
        return { message: 'Deleted successfully', success: true };
      }

      return { message: error, success: false };
    }
  }

  async executeFindAllQuery(): Promise<
    ApiResponseDto<DisplayNotificationDto[]>
  > {
    try {
      const query = await this.service.findAll();

      return {
        success: true,
        data: plainToInstance(DisplayNotificationDto, query),
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'Unexpected error',
      };
    }
  }

  async executeFindByUserQuery(
    userId: number,
  ): Promise<ApiResponseDto<DisplayNotificationDto[]>> {
    try {
      const query = await this.service.findByUser(userId);

      return {
        success: true,
        data: plainToInstance(DisplayNotificationDto, query),
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'Unexpected error',
      };
    }
  }

  async executeMarkAsReadCommand(
    id: number,
  ): Promise<ApiResponseDto<DisplayNotificationDto>> {
    try {
      const notification = await this.service.findById(id);
      if (!notification)
        return { success: false, message: 'Notification Not Found.' };
      const command = await this.service.markAsRead(notification.id);
      return {
        success: true,
        data: plainToInstance(DisplayNotificationDto, command),
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'Unexpected error',
      };
    }
  }
}
