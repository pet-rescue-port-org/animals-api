import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Body,
  UsePipes,
} from '@nestjs/common';
import { AnimalsService } from '@/animals/animals.service';
import { Animal } from '@prisma/client';
import { ZodValidationPipe } from '@/middleware/zod-validator/zod-validator.pipe';
import { AnimalSchema } from '@/types/animal';

@Controller('animals')
export class AnimalsController {
  constructor(private animalsService: AnimalsService) {}

  @Get()
  public getAnimals() {
    return this.animalsService.getAllAnimals();
  }

  @Get(':id')
  public getAnimal(@Param() params: { id: string }) {
    return this.animalsService.getAnimal(params?.id);
  }

  @Post('/delete')
  public deleteAnimal(@Param() params: { id: string }) {
    return this.animalsService.deleteAnimal(params?.id);
  }

  @Put('/update/:id')
  @UsePipes(new ZodValidationPipe(AnimalSchema.partial()))
  public updateAnimal(
    @Body() animal: Partial<Animal>,
    @Param() params: { id: string },
  ) {
    const stringifyId = params?.id.toString();
    return this.animalsService.updateAnimal(stringifyId, animal);
  }

  @Post('/create')
  @UsePipes(new ZodValidationPipe(AnimalSchema))
  public setAnimal(@Body() animal: Animal) {
    return this.animalsService.setAnimal(animal);
  }
}
