import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Person } from '../../people/entities/person.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  text: string;

  @Column({ default: false })
  isRead: boolean;

  @Column()
  date: Date;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Muitas mensagens podem ser enviadas por uma única pessoa
  @JoinColumn({ name: 'from' }) // Especifica a coluna "de" que armazena o ID da pessioa que ENVIOU a mensagem
  from: Person;

  @ManyToOne(() => Person, { onDelete: 'CASCADE', onUpdate: 'CASCADE' }) // Muitas mensagens podem ser enviadas por uma única pessoa
  @JoinColumn({ name: 'to' }) // Especifica a coluna "de" que armazena o ID da pessioa que ENVIOU a mensagem
  to: Person;
}

// Entidade já pronta , da messagem
