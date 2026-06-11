import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { PersonCreateDto } from './dto/person-create.dto';
import { PersonUpdateDto } from './dto/person-update.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Post()
  create(@Body() body: PersonCreateDto) {
    return this.peopleService.create(body);
  }

  @Get()
  findAll() {
    return this.peopleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: PersonUpdateDto) {
    return this.peopleService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.peopleService.remove(id);
  }
}
