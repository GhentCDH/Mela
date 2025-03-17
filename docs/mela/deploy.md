# Deploy

How to deploy MELA on a server.

## Run migration of the database

```bash
 DATABASE_APP_URL=postgresql://{{DB_URL}} npx prisma migrate deploy
```