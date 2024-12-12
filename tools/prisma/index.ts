import { generatePrismaService } from './prisma';
import * as path from 'path';
import { generateForm } from './form';

const prismaPackage = `@prisma/client`;
const generatedDir = path.join(__dirname, '../../generated');
const prismaDir = path.join(generatedDir, 'prisma');
const typesDir = path.join(generatedDir, 'types');

generateForm(typesDir);
generatePrismaService(prismaPackage, prismaDir);
