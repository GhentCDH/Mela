import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthorsModule } from './authors/authors.module';

@Module({
  imports: [PrismaModule, AuthorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
