import { z } from 'zod';

export const AnimalSchema = z.object({
  id: z.string(),
  name: z.string(),
  species: z.string(),
  location: z.string(),
  adopted: z.boolean(),
  intakeDate: z.date(),
  outakeDate: z.date().nullable(),
  description: z.string().nullable(),
  medicalInfo: z.string().nullable(),
});
