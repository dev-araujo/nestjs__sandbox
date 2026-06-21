import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntIdPipe implements PipeTransform<any, number> {
  transform(value: any, metadata: ArgumentMetadata): number {
    this.validateMetadata(metadata);

    const parsedValue = Number(value);
    this.validateParsedId(parsedValue);

    return parsedValue;
  }

  private validateMetadata(metadata: ArgumentMetadata): void {
    this.validateIsParamType(metadata);
    this.validateIsIdParam(metadata);
  }

  private validateParsedId(value: number): void {
    this.validateIsNumber(value);
    this.validateIsPositive(value);
  }

  private validateIsParamType(metadata: ArgumentMetadata): void {
    if (metadata.type !== 'param') {
      throw new BadRequestException(
        'ParseIntIdPipe só pode ser usado em parâmetros',
      );
    }
  }

  private validateIsIdParam(metadata: ArgumentMetadata): void {
    if (metadata.data !== 'id') {
      throw new BadRequestException(
        'ParseIntIdPipe deve ser usado apenas no parâmetro "id"',
      );
    }
  }

  private validateIsNumber(value: number): void {
    if (isNaN(value)) {
      throw new BadRequestException('Param ID is not a number');
    }
  }

  private validateIsPositive(value: number): void {
    if (value < 0) {
      throw new BadRequestException('ID must be greater than zero');
    }
  }
}
