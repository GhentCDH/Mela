# Prisma documentation

The used configuration is for a postgress database.

Any change to the schema should be followed by

```bash
npx prisma migrate dev --name <name> 
```

After that a (re)generation of the prisma client, and other files is needed. (this is done in the docker file as well)

```bash
 pnpm run generate:prisma
```

Don't commit the generated code as well to the repository.
