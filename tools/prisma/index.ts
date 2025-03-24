import { fixPrismaImports } from './fix-imports';
import { generateForm } from './form';
import { generatePrismaService } from './prisma';
import * as model from '../../generated/types/modelSchema';
import * as path from 'path';

const prismaPackage = `@prisma/client`;
const generatedDir = path.join(__dirname, '../../generated');
const prismaDir = path.join(generatedDir, 'prisma');
const typesDir = path.join(generatedDir, 'types');
const dtoDir = path.join(generatedDir, 'types/dtos');
const formDir = path.join(generatedDir, 'types/forms');

fixPrismaImports(typesDir);
generateForm(dtoDir, formDir, model);
generatePrismaService(prismaPackage, prismaDir);
