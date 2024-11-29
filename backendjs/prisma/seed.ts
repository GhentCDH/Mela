import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

const author1 = await prisma.author.upsert({
    where: { name: 'Jolkien Rolkien Rolkien Tolkien' },
    update: {},
    create: {
      name: 'Jolkien Rolkien Rolkien Tolkien'
    }});

    console.log({ author1});
}


main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      // close Prisma Client at the end
      await prisma.$disconnect();
    });
  

