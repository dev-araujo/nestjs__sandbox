import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PersonCreateDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
