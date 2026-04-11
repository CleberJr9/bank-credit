import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class PrismaService implements OnModuleInit {
  prisma: PrismaClient;
  constructor() {}
  async onModuleInit() {
    this.prisma = new PrismaClient();
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}