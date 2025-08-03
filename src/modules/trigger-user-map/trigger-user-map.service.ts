// trigger-user-map.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructre/prisma/prisma.service';
import { CreateTriggerUserMapDto } from 'src/interfaces/dtos/trigger-user-map/create-trigger-user-map.dto';
import { FilterTriggerUserMapDto } from 'src/interfaces/dtos/trigger-user-map/filter-trigger-user-map.dto';

@Injectable()
export class TriggerUserMapService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTriggerUserMapDto) {
    return this.prisma.triggerUserMap.create({ data });
  }

  delete(id: number) {
    return this.prisma.triggerUserMap.delete({ where: { id } });
  }

  findAll() {
    return this.prisma.triggerUserMap.findMany();
  }

  findByUser(userId: number) {
    return this.prisma.triggerUserMap.findMany({ where: { user_id: userId } });
  }

  async findByFilter(filter: FilterTriggerUserMapDto) {
    // Remove undefined keys so Prisma doesn't filter by them
    const where = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== undefined),
    );

    return this.prisma.triggerUserMap.findMany({ where });
  }
}
