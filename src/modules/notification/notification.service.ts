import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructre/prisma/prisma.service';
import { CreateNotificationDto } from 'src/interfaces/dtos/notification/create-notification.dto';
import { FilterNotificationDto } from 'src/interfaces/dtos/notification/filter-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateNotificationDto) {
    return this.prisma.notification.create({ data });
  }

  findAll() {
    return this.prisma.notification.findMany();
  }

  findById(id: number) {
    return this.prisma.notification.findFirst({ where: { id } });
  }

  findByUser(userId: number) {
    return this.prisma.notification.findMany({ where: { user_id: userId } });
  }

  markAsRead(id: number) {
    return this.prisma.notification.update({
      where: { id },
      data: { is_read: true },
    });
  }

  delete(id: number) {
    return this.prisma.notification.delete({ where: { id } });
  }

  async findByFilter(filter: FilterNotificationDto) {
    // Remove undefined keys so Prisma doesn't filter by them
    const where = Object.fromEntries(
      Object.entries(filter).filter(([_, v]) => v !== undefined),
    );

    return this.prisma.notification.findMany({ where });
  }
}
