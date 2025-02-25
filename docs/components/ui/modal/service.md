# Modal service

The modal service is a simple way to open a modal from anywhere in your application. It is a singleton service that can be imported and used in any component.

1. Add the modal wrapper component to your application. If you use the shell component it is already provided there.

```typescript
import { ModalWrapper } from "@ghentcdh/ui";
```

```vue
      <ModalWrapper />
```

2. Call one of the functions on the service to open a modal.

```typescript
import { ModalService } from "@ghentcdh/ui";

    ModalService.showAlert({
      title: 'Alert',
      message: 'This is an alert' 
    });
``` 

## Demo

<script setup>
import { Btn, ModalService, ModalWrapper } from "@ghentcdh/ui";

const showConfirm = () => {
    const handleClose = (result) => {
        if(result?.confirmed) alert('Confirmed');
        else alert('Cancelled');
    }; 

    ModalService.showConfirm({
        title: 'Alert',
        message: 'This is an alert',
        onClose: handleClose
    });
};

</script>

<ModalWrapper />

<Btn @click="showConfirm">Open Confirm</Btn>