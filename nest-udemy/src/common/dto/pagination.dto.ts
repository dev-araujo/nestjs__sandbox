import { IsInt, IsOptional,Min,Max } from 'class-validator';
import {Type} from 'class-transformer'

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(50)
  @Type(()=> Number)
  limit: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Type(()=> Number)
  offset: number;
}
