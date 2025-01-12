import { Injectable,OnModuleDestroy,OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService  extends PrismaClient implements OnModuleDestroy,OnModuleInit{
    async onModuleInit() {
        console.log('Prisma Service Init');
        await this.$connect();
    }
    async onModuleDestroy() {
        console.log('Prisma Service Destroy');
        await this.$disconnect();
    }
}
