import { generateForm } from './form';
import { generatePrismaService } from './prisma';
// eslint-disable-next-line @nx/enforce-module-boundaries
import * as model from '../../generated/types/src/modelSchema';
import * as path from 'path';

const prismaPackage = `@prisma/client`;
const generatedDir = path.join(__dirname, '../../generated');
const prismaDir = path.join(generatedDir, 'prisma/src');
const typesDir = path.join(generatedDir, 'types');
const dtoDir = path.join(generatedDir, 'dtos/src');
const formDir = path.join(generatedDir, 'forms/src');

// fixPrismaImports(typesDir);
generateForm(dtoDir, formDir, model);
generatePrismaService(prismaPackage, prismaDir);
