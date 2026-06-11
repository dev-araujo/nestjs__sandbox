import { PartialType } from '@nestjs/mapped-types';
import { PersonCreateDto } from './person-create.dto';

export class PersonUpdateDto extends PartialType(PersonCreateDto) {}
