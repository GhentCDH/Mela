# Logging api for nestjs application

## Install the libraries

```ssh
pnpm add @ghentcdh/logging/backend 
```

## Configuration

1. adjust the nestjs file `main.ts` to include the logging module

```typescript

import {Logger as MyLogger} from '@ghentcdh/tools/logging/api';

// bootstrap the application


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    //...

    app.useLogger(new MyLogger())
    //...
}

```

2. configure the logging environment variable ```LOG_DIR``` in the `.env` file

```
LOG_DIR=/tmp/logs
```

3. Use the logging command

```typescript
import {Logger} from '@ghentcdh/tools/logging/api';


Logger.log('Nest hello api', 'AppController');
```
