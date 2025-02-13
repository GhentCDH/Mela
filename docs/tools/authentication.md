# Use the GhentCDH keycloak libraries for authentication

## Install the libraries

```ssh
pnpm add @ghentcdh/auth/frontend @ghentcdh/auth/backend
```

## Frontend vuejs

Add following environment variables to the `.env` file.

```
      - VITE_KEYCLOAK_HOST=$KEYCLOAK_HOST
      - VITE_KEYCLOAK_REALM=$KEYCLOAK_REALM
      - VITE_KEYCLOAK_CLIENT_ID=$KEYCLOAK_CLIENT_ID
```

### Check if a user is logged in

```vue

<script setup lang="ts">
  import {useAuthenticationStore} from "@ghentcdh/authentication/frontend";

  const authenticationStore = useAuthenticationStore();
</script>

<template>
  <pre>user: {{ authenticationStore.user() }}</pre>
</template>

```

### Perform backend requests with the token

```vue

<script setup lang="ts">
  import {useHttpStore} from "@ghentcdh/authentication/frontend";

  const httpStore = useHttpStore();

  httpStore.post('/api/auth/login', {}).then(response => {
    alert('login ok')
  });
</script>


```

> TODO list
> - [ ] Add roles guard to see if routes or parts of the application can be accessed by that user
> - [ ] Test if it's possible to have public routes
> - [ ] Add a
> - [ ] Add logout functionality

## Backend nestjs

Add following environment variables to the `.env` file.

```
      - KEYCLOAK_HOST=$KEYCLOAK_HOST
      - KEYCLOAK_REALM=$KEYCLOAK_REALM
```

### Secure requests

Add the module to your module.ts imports

```typescript

import {AuthenticationApiModule} from "@ghentcdh/authentication/api";

@Module({
    imports: [AuthenticationApiModule],
})
export class MyModule {
}

```

Use the `@GhentCdhGuard` decorator to secure your routes

```typescript
import {GhentCdhGuard} from "@ghentcdh/authentication/api";

@Controller()
export class MyController {
    @UseGuards(GhentCdhGuard)
    @Post('/secure')
    async securePath(@User() user: any, @Request() req: any) {
        return user;
    }
}
```

The `@User()` decorator will give you the user object from the keycloak token.


> TODO list
> - [ ] Add roles decorator and implement logic `@GhentCdhRoles(['admin'])`

## Development environment

Make sure the following is added to your hosts file, if you are running a local keycloak instance. Internally the docker
containers cannot connect to the localhost:8080 port, so a hook is needed in terms of host rewrite.

```sh
echo "127.0.0.1 authentication\n" | sudo tee -a /etc/hosts
```

## Setup docker

> TODO describe me
