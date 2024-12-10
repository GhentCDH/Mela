# logging-frontend

This logging will just perform output to the console. Different levels can be enabled through environment variables

```
VITE_VERBOSE_DEBUG=true // By default this is false
VITE_DEBUG_ENABLE=true // By default this is false
```

## Usage

```typescript
import {Debugger} from "@ghentcdh/tools/logging/frontend";

Debugger.log('my message');
```
