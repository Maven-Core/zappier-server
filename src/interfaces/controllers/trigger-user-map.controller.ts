import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { TriggerUserMapService } from 'src/modules/trigger-user-map/trigger-user-map.service';
import { CreateTriggerUserMapDto } from '../dtos/trigger-user-map/create-trigger-user-map.dto';
import { DisplayTriggerUserMapDto } from '../dtos/trigger-user-map/display-trigger-user-map.dto';
import { TriggerUserMapHandler } from '../handlers/triggerUserMapHandler';
import { ApiOkResponseDto } from '../decorators/api-ok-response-dto.decorator';
import { ARD } from '../dtos/base/api-response-dto';

@ApiTags('trigger-user-map')
@Controller('trigger-user-map')
export class TriggerUserMapController {
  constructor(private readonly handler: TriggerUserMapHandler) {}

  @Post()
  @ApiBody({ type: CreateTriggerUserMapDto })
  @ApiOkResponseDto(DisplayTriggerUserMapDto)
  create(
    @Body() body: CreateTriggerUserMapDto,
  ): Promise<ARD<DisplayTriggerUserMapDto>> {
    return this.handler.executeCreateCommand(body);
  }

  @Delete('/:id')
  @ApiOkResponseDto()
  delete(@Param('id', ParseIntPipe) id: number): Promise<ARD> {
    return this.handler.executeDeleteCommand(id);
  }

  @Get()
  @ApiOkResponseDto([DisplayTriggerUserMapDto])
  findAll(): Promise<ARD<DisplayTriggerUserMapDto[]>> {
    return this.handler.executeFindAllQuery();
  }

  @Get('user/:userId')
  @ApiOkResponseDto([DisplayTriggerUserMapDto])
  findByUser(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<ARD<DisplayTriggerUserMapDto[]>> {
    return this.handler.executeFindByUserQuery(userId);
  }
}
