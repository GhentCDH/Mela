use# Prisma documentation

The used configuration is for a postgress database.

Any change to the schema should be followed by

```bash
DATABASE_APP_URL=postgresql://mela_app_user:mela_app_pass@localhost:54320/mela_app npx prisma migrate dev --name <name> 
```

After that a (re)generation of the prisma client, and other files is needed. (this is done in the docker file as well)

```bash
 npx nx run generated-types:build 
 npx nx run generated-prisma:build 
 npx nx run generated-dto:build 
```

Don't commit the generated code as well to the repository.
