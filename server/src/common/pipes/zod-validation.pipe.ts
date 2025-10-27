import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { type ZodType, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const formatted = this.formatZodError(result.error);
      throw new BadRequestException({
        message: 'Validation failed',
        errors: formatted,
      });
    }

    return result.data;
  }

  private formatZodError(error: ZodError) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of error.issues) {
      const field = issue.path.join('.') || 'form';
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    }
    return fieldErrors;
  }
}
