import { PipeTransform, BadRequestException, Injectable } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsed = this.schema.parse(value);
      return parsed;
    } catch {
      throw new BadRequestException('Validation failed');
    }
  }
}