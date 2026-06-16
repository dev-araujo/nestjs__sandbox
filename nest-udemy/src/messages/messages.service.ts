import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessageUpdateDto } from './dto/message-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PeopleService } from '../people/people.service';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly peopleService: PeopleService,
  ) {}

  async findAll(pagination?: PaginationDto ) {
    const {limit = 10, offset = 0} = pagination ?? {}

    const messages = await this.messageRepository.find({
      take:limit,
      skip:offset,
      relations: {
        from: true,
        to: true,
      },
      order: {
        id: 'desc',
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: {
        from: true,
        to: true,
      },
      select: {
        from: {
          id: true,
          name: true,
        },
        to: {
          id: true,
          name: true,
        },
      },
    });

    if (!message) {
      throw new HttpException(
        `Message not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return message;
  }

  async create(body: MessageCreateDto) {
    const { fromId, toId } = body;
    // encontrar a pessoa que está criando a mensagem
    const from = await this.peopleService.findOne(fromId);
    // encontrar a pessoa para quem a mensagem está sendo enviado
    const to = await this.peopleService.findOne(toId);
    const newMessage: any = {
      text: body.text,
      from,
      to,
      isRead: false,
      date: new Date(),
    };
    const message = await this.messageRepository.create(newMessage);
    await this.messageRepository.save(message);

    return {
      ...message,
      from: {
        id: newMessage.from.id,
      },
      to: {
        id: newMessage.to.id,
      },
    };
  }

  async update(id: number, body: MessageUpdateDto) {
    const message = await this.findOne(id);
    message.text = body?.text ?? message.text;
    message.isRead = body?.isRead ?? message.isRead;
    await this.messageRepository.save(message);

    return message;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({
      id,
    });

    if (!message) {
      throw new HttpException(
        `Message not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.messageRepository.remove(message);
  }
}
