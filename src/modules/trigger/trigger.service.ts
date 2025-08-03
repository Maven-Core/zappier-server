import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructre/prisma/prisma.service';
import { BaseCreateDto } from 'src/interfaces/dtos/base/base-dto';
import { CreateTriggerDto } from 'src/interfaces/dtos/trigger/create-trigger.dto';
import { FilterTriggerDto } from 'src/interfaces/dtos/trigger/filter-trigger.dto';

@Injectable()
export class TriggerService {
  constructor(private prisma: PrismaService) {}

  create(data: BaseCreateDto<CreateTriggerDto>) {
    return this.prisma.trigger.create({ data });
  }

  findAll() {
    return this.prisma.trigger.findMany();
  }

  delete(id: number) {
    return this.prisma.trigger.delete({ where: { id } });
  }

  async findByFilter(filter: FilterTriggerDto) {
    // Remove undefined keys so Prisma doesn't filter by them
    const where = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== undefined),
    );

    return this.prisma.trigger.findMany({ where });
  }
}
