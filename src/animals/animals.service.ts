import { Injectable } from '@nestjs/common';
import { Animal } from '@prisma/client';
import { PrismaAdapterService } from '@/prisma-adapter/prisma-adapter.service';

@Injectable()
export class AnimalsService {
  constructor(private prisma: PrismaAdapterService) {}

  public getAllAnimals(): Promise<Animal[]> {
    return this.prisma.animal.findMany();
  }

  public getAnimal(id: string): Promise<Animal | null> {
    return this.prisma.animal.findUnique({ where: { id } });
  }

  public setAnimal(animal: Animal): Promise<Animal> {
    return this.prisma.animal.create({ data: animal });
  }

  public deleteAnimal(id: string): Promise<Animal> {
    return this.prisma.animal.delete({ where: { id } });
  }

  public updateAnimal(id: string, animal: Partial<Animal>): Promise<Animal> {
    return this.prisma.animal.update({ where: { id }, data: animal });
  }
}
