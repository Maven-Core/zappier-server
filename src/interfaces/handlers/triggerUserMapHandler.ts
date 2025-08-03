import { Injectable } from '@nestjs/common';
import { TriggerUserMapService } from 'src/modules/trigger-user-map/trigger-user-map.service';
import { ApiResponseDto } from '../dtos/base/api-response-dto';
import { CreateTriggerUserMapDto } from '../dtos/trigger-user-map/create-trigger-user-map.dto';
import { DisplayTriggerUserMapDto } from '../dtos/trigger-user-map/display-trigger-user-map.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class TriggerUserMapHandler {
  constructor(private readonly service: TriggerUserMapService) {}

  async executeCreateCommand(
    createDto: CreateTriggerUserMapDto,
  ): Promise<ApiResponseDto<DisplayTriggerUserMapDto>> {
    try {
      const { trigger_id, user_id } = createDto;

      const existingMaps = await this.service.findByFilter({
        user_id,
        trigger_id,
      });
      if (existingMaps.length > 0) {
        return { message: 'Mapping already exists', success: false };
      }

      const newMapping = await this.service.create(createDto);
      return {
        success: true,
        message: 'Mapping created successfully',
        data: plainToInstance(DisplayTriggerUserMapDto, newMapping),
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
    ApiResponseDto<DisplayTriggerUserMapDto[]>
  > {
    try {
      const query = await this.service.findAll();

      return {
        success: true,
        data: plainToInstance(DisplayTriggerUserMapDto, query),
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
  ): Promise<ApiResponseDto<DisplayTriggerUserMapDto[]>> {
    try {
      const query = await this.service.findByUser(userId);

      return {
        success: true,
        data: plainToInstance(DisplayTriggerUserMapDto, query),
      };
    } catch (error) {
      return {
        success: false,
        message: error?.message || 'Unexpected error',
      };
    }
  }
}
