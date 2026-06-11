import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from './entities/person.entity';
import { PersonCreateDto } from './dto/person-create.dto';
import { PersonUpdateDto } from './dto/person-update.dto';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async findAll() {
    const people = await this.personRepository.find();
    return people;
  }

  async findOne(id: number) {
    const person = await this.personRepository.findOne({
      where: {
        id,
      },
    });

    if (!person) {
      throw new HttpException(
        `Person not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return person;
  }

  async create(body: PersonCreateDto) {
    const person = this.personRepository.create(body);
    return this.personRepository.save(person);
  }

  async update(id: number, body: PersonUpdateDto) {
    const person = await this.personRepository.preload({
      id,
      ...body,
    });

    if (!person) {
      throw new HttpException(
        `Person not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.personRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({
      id,
    });

    if (!person) {
      throw new HttpException(
        `Person not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.personRepository.remove(person);
  }
}
