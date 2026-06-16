import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import {MessageCreateDto} from './dto/message-create.dto'
import { MessageUpdateDto } from './dto/message-update.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() body: MessageCreateDto) {
    return this.messagesService.create(body)
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {

    return this.messagesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id',ParseIntPipe) id: number, @Body() body: MessageUpdateDto) {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.messagesService.remove(id);
  }
}
