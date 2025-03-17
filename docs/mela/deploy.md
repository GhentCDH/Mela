# Deploy

How to deploy MELA on a server.

## Create a new release

1. Run `npx nx release --skip-publish` locally. This will create a commit with the version and changelog updates, then create a tag for the new version.
2. Push the changes (including the new tag) to the remote repository with `git push && git push --tags`.
3. The publish workflow will automatically trigger and publish the packages to the npm registry.

Once published this will publish automatically a new version to the docker registry.

## Run migration of the database

```bash
 DATABASE_APP_URL=postgresql://{{DB_URL}} npx prisma migrate deploy
```
