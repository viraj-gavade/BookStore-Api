import { Injectable,OnModuleDestroy,OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * Prisma database service for database operations
 * Extends PrismaClient and implements lifecycle hooks for connection management
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleDestroy,OnModuleInit {
    /**
     * Lifecycle hook that runs when the module is initialized
     * Establishes the database connection
     */
    async onModuleInit() {
        console.log('Prisma Service Init');
        await this.$connect();
    }
    
    /**
     * Lifecycle hook that runs when the module is destroyed
     * Closes the database connection
     */
    async onModuleDestroy() {
        console.log('Prisma Service Destroy');
        await this.$disconnect();
    }
}
