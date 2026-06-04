import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessageUpdateDto } from './dto/message-update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  async findAll() {
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findOne(id: number) {
    const message = await this.messageRepository.findOne({
      where: {
        id,
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
    const newMessage: any = {
      ...body,
      isRead: false,
      date: new Date(),
    };
    const message = await this.messageRepository.create(newMessage);
    return this.messageRepository.save(message);
  }

  async update(id: number, body: MessageUpdateDto) {
    const partialUpdate = {
      isRead: body?.isRead,
      text: body?.text,
    };
    const message = await this.messageRepository.preload({
      id,
      ...partialUpdate,
    });

    if (!message) {
      throw new HttpException(
        `Message not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.messageRepository.save(message);
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
