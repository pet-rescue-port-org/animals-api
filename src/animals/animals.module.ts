import { Module } from '@nestjs/common';
import { AnimalsController } from '@/animals/animals.controller';
import { AnimalsService } from '@/animals/animals.service';
import { PrismaAdapterService } from '@/prisma-adapter/prisma-adapter.service';

@Module({
  controllers: [AnimalsController],
  providers: [AnimalsService, PrismaAdapterService],
})
export class AnimalsModule {}
