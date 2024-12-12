import * as fs from 'fs';
import * as path from 'path';

export const generatePrismaService = (
  prismaClientPackage: string,
  dir: string
) => {
  if (fs.existsSync(dir)) fs.rmdirSync(dir, { recursive: true });

  fs.mkdirSync(dir, { recursive: true });

  const prismaService = `
    import { Injectable, OnModuleInit } from '@nestjs/common';
    import { PrismaClient } from '@prisma/client';
    
    @Injectable()
    export class PrismaService extends PrismaClient implements OnModuleInit {
      async onModuleInit() {
        await this.$connect();
      }
    }
  `;

  fs.writeFileSync(path.join(dir, `prisma.service.ts`), prismaService);

  const prismaModule = `
  import { Module } from '@nestjs/common';
  import { PrismaService } from './prisma.service';
  
  @Module({
    controllers: [],
    providers: [PrismaService],
    exports: [PrismaService],
  })
  export class PrismaModule {}
`;
  fs.writeFileSync(path.join(dir, `prisma.module.ts`), prismaModule);

  const index = `
    export * from './prisma.service';
    export * from './prisma.module';
  `;

  fs.writeFileSync(path.join(dir, `index.ts`), index);
};
