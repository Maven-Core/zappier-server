import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infrastructre/prisma/prisma.service';
import { CreateNotificationDto } from 'src/interfaces/dtos/notification/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateNotificationDto) {
    return this.prisma.notification.create({ data });
  }

  findAll() {
    return this.prisma.notification.findMany();
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
}
