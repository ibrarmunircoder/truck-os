import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

/**
 * Trims the original value
 */
export const Trim = (): PropertyDecorator =>
  applyDecorators(
    Transform(
      (arg) => typeof arg.value=== 'string' ? arg.value?.trim(): '')
  );
