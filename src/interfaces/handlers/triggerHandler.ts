import { Injectable } from '@nestjs/common';
import { TriggerService } from 'src/modules/trigger/trigger.service';
import { ApiResponseDto } from '../dtos/base/api-response-dto';
import { CreateTriggerDto } from '../dtos/trigger/create-trigger.dto';
import { DisplayTriggerDto } from '../dtos/trigger/display-trigger.dto';
import { plainToInstance } from 'class-transformer';
import { JwtPayloadDto } from 'src/infrastructre/auth/jwt-payload.dto';
import { withAudit } from '../dtos/base/base-dto';
import { TriggerUserMapService } from 'src/modules/trigger-user-map/trigger-user-map.service';
import { NotificationService } from 'src/modules/notification/notification.service';

@Injectable()
export class TriggerHandler {
  constructor(
    private readonly service: TriggerService,
    private readonly mapService: TriggerUserMapService,
    private readonly notificationService: NotificationService,
  ) {}

  async executeCreateCommand(
    createDto: CreateTriggerDto,
    payloadUser: JwtPayloadDto,
  ): Promise<ApiResponseDto<DisplayTriggerDto>> {
    try {
      // Merge user ID into the DTO properly (overwrite if needed)
      const triggerData = withAudit(createDto, payloadUser.id);

      const createdTrigger = await this.service.create(triggerData);

      return {
        success: true,
        message: 'Trigger created successfully',
        data: plainToInstance(DisplayTriggerDto, createdTrigger),
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Failed to create trigger',
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

  async executeFindAllQuery(): Promise<ApiResponseDto<DisplayTriggerDto[]>> {
    try {
      const query = await this.service.findAll();

      return {
        success: true,
        data: plainToInstance(DisplayTriggerDto, query),
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'Unexpected error',
      };
    }
  }

  async executeRunAllTriggersCommand(): Promise<ApiResponseDto> {
    const maps = await this.mapService.findAll();
    let count = 0;

    for (const map of maps) {
      await this.notificationService.create({
        message: 'New lead in Sheet',
        trigger_id: map.trigger_id,
        user_id: map.user_id,
      });
      count++;
    }
    return {
      success: true,
      message: `All triggers executed. ${count} notifications sent.`,
    };
  }
}
