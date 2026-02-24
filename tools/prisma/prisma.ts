import * as fs from 'fs';
import * as path from 'path';

export const generatePrismaService = (
  prismaClientPackage: string,
  dir: string,
) => {
  if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true });

  fs.mkdirSync(dir, { recursive: true });

  const prismaService = `
 import {Injectable} from '@nestjs/common';
import {PrismaClient} from '@prisma/client';
import {PrismaPg} from '@prisma/adapter-pg'

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        const adapter = new PrismaPg({connectionString: process.env.DATABASE_APP_URL});

        console.log('db app url', process.env.DATABASE_APP_URL)
        super({adapter});
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

const generatedDir = path.join(__dirname, '../../generated');
const prismaPackage = `@prisma/client`;
const prismaDir = path.join(generatedDir, 'prisma/src');
generatePrismaService(prismaPackage, prismaDir);
