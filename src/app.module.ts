import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactService } from './contact/contact.service';
import { PrismaService } from './prisma/prisma.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ContactController } from './contact/contact.controller';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async () => typeOrmConfig,
      inject: [ConfigService],
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    ContactModule,
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, ContactService, PrismaService],
})
export class AppModule {}
