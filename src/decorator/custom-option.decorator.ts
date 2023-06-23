import { applyDecorators, SetMetadata } from '@nestjs/common';

export function CustomOption(options: string[]) {
  return applyDecorators(SetMetadata('customOptions', options));
}


