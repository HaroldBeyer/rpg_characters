import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: false,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGODB_CONNECTION_STRING,
      database: process.env.MONGODB_DATABASE,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }