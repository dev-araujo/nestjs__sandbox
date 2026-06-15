import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from '../../messages/entities/message.entity';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Uma pessoa pode ter enviado muitos recados como (from)
  // Essas mensagens relacionadas ao from (de)
  @OneToMany(() => Message, message => message.from)
  messagesSent: Message[];

  // Uma pessoa pode ter recebido muitas mensagens como (to)
  // Essas mensagens relacionadas ao to (para)
  @OneToMany(() => Message, message => message.to)
  messagesIncoming: Message[];
}
