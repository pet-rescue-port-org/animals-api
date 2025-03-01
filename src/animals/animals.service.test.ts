import { Test, TestingModule } from '@nestjs/testing';
import { AnimalsService } from './animals.service';
import { PrismaAdapterService } from '@/prisma-adapter/prisma-adapter.service';
import { Animal } from '@prisma/client';

describe('AnimalsService', () => {
  let service: AnimalsService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let prismaService: PrismaAdapterService;

  const mockAnimal: Animal = {
    id: '1',
    name: 'Max',
    species: 'Dog',
    location: 'Kennel A',
    adopted: false,
    intakeDate: new Date(),
    outakeDate: null,
    description: 'Friendly dog',
    medicalInfo: 'Vaccinated',
  };

  const mockPrismaService = {
    animal: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnimalsService,
        {
          provide: PrismaAdapterService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AnimalsService>(AnimalsService);
    prismaService = module.get<PrismaAdapterService>(PrismaAdapterService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAnimals', () => {
    it('should return an array of animals', async () => {
      mockPrismaService.animal.findMany.mockResolvedValue([mockAnimal]);

      const result = await service.getAllAnimals();

      expect(result).toEqual([mockAnimal]);
      expect(mockPrismaService.animal.findMany).toHaveBeenCalled();
    });
  });

  describe('getAnimal', () => {
    it('should return a single animal by id', async () => {
      mockPrismaService.animal.findUnique.mockResolvedValue(mockAnimal);

      const result = await service.getAnimal('1');

      expect(result).toEqual(mockAnimal);
      expect(mockPrismaService.animal.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('setAnimal', () => {
    it('should create a new animal', async () => {
      mockPrismaService.animal.create.mockResolvedValue(mockAnimal);

      const result = await service.setAnimal(mockAnimal);

      expect(result).toEqual(mockAnimal);
      expect(mockPrismaService.animal.create).toHaveBeenCalledWith({
        data: mockAnimal,
      });
    });
  });

  describe('deleteAnimal', () => {
    it('should delete an animal', async () => {
      mockPrismaService.animal.delete.mockResolvedValue(mockAnimal);

      const result = await service.deleteAnimal('1');

      expect(result).toEqual(mockAnimal);
      expect(mockPrismaService.animal.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  describe('updateAnimal', () => {
    it('should update an animal', async () => {
      const updateData: Partial<Animal> = { name: 'Updated Name' };
      mockPrismaService.animal.update.mockResolvedValue({
        ...mockAnimal,
        ...updateData,
      });

      const result = await service.updateAnimal('1', updateData);

      expect(result).toEqual({ ...mockAnimal, ...updateData });
      expect(mockPrismaService.animal.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateData,
      });
    });
  });
});
