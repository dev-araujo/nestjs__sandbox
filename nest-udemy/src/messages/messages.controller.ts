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
  UsePipes,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessageUpdateDto } from './dto/message-update.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ParseIntIdPipe } from '../common/pipes/parse-int-id.pipe';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  create(@Body() body: MessageCreateDto) {
    return this.messagesService.create(body);
  }

  @Get()
  findAll(@Query() pagination: PaginationDto) {
    return this.messagesService.findAll(pagination);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntIdPipe) id: number) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntIdPipe) id: number,
    @Body() body: MessageUpdateDto,
  ) {
    return this.messagesService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntIdPipe) id: number) {
    return this.messagesService.remove(id);
  }
}
