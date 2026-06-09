import { PartialType } from '@nestjs/mapped-types';
import { MessageCreateDto } from './message-create.dto';
import { IsBoolean,IsOptional } from 'class-validator';

export class MessageUpdateDto extends PartialType(MessageCreateDto) {
  @IsBoolean()
  @IsOptional()
   readonly isRead:boolean
}
// o que eu preciso para atualizar uma messagem
