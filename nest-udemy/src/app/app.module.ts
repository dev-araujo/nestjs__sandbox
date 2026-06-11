import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from '../messages/messages.module';
import { PeopleModule } from '../people/people.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      database:'postgres',
      password:'123',
      autoLoadEntities:true, // Load entities without specify
      synchronize:true,  // sync aut with DB . // not production
    }),
    MessagesModule,
    PeopleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
