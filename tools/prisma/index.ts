import { fixPrismaImports } from './fix-imports';
import { generateForm } from './form';
import { generatePrismaService } from './prisma';
import * as model from '../../generated/types/src/lib/modelSchema';
import * as path from 'path';

const prismaPackage = `@prisma/client`;
const generatedDir = path.join(__dirname, '../../generated');
const prismaDir = path.join(generatedDir, 'prisma-client/src');
const typesDir = path.join(generatedDir, 'types');
const dtoDir = path.join(generatedDir, 'dtos/src');
const formDir = path.join(generatedDir, 'forms/src');

fixPrismaImports(typesDir);
generateForm(dtoDir, formDir, model);
generatePrismaService(prismaPackage, prismaDir);
