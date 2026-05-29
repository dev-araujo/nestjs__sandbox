import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { MessageCreateDto } from './dto/message-create.dto';
import { MessageUpdateDto } from './dto/message-update.dto';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      text: 'Hello World',
      from: 'John Doe',
      to: 'Jane Doe',
      isRead: false,
      date: new Date(),
    }
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const message = this.messages.find(item => item.id === id);

    if (!message) {
      throw new HttpException(
        `Message not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return message;
  }

  create(body: MessageCreateDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage: any = {
      id,
      ...body,
      isRead: false,
      date: new Date(),
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  update(id: number, body: MessageUpdateDto) {
    const messageId = this.messages.findIndex(item => item.id === id);

    if (messageId < 0) {
      throw new HttpException(
        `Message not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    const message = this.messages[messageId];

    this.messages[messageId] = {
      ...message,
      ...body,
    };

    return this.messages[messageId];
  }

  remove(id: number) {
    const messageId = this.messages.findIndex(item => item.id === id);

    if (messageId < 0) {
      throw new HttpException(
        `Message not found for id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
    this.messages.splice(messageId, 1);

    return `Message with id ${id} removed `;
  }
}
