// trigger-user-map.service.ts
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructre/prisma/prisma.service';
import { CreateTriggerUserMapDto } from 'src/interfaces/dtos/trigger-user-map/create-trigger-user-map.dto';

@Injectable()
export class TriggerUserMapService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTriggerUserMapDto) {
    return this.prisma.triggerUserMap.create({ data });
  }

  findAll() {
    return this.prisma.triggerUserMap.findMany();
  }

  findByUser(userId: number) {
    return this.prisma.triggerUserMap.findMany({ where: { user_id: userId } });
  }
}
