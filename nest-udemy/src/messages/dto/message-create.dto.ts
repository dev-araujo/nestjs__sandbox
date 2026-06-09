import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class MessageCreateDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  readonly text: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  readonly from: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(30)
  readonly to: string;
}

// o que eu preciso para criar uma messagem
