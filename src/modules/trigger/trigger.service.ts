import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructre/prisma/prisma.service';
import { CreateTriggerDto } from 'src/interfaces/dtos/trigger/create-trigger.dto';

@Injectable()
export class TriggerService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateTriggerDto) {
    return this.prisma.trigger.create({ data });
  }

  findAll() {
    return this.prisma.trigger.findMany();
  }
}
