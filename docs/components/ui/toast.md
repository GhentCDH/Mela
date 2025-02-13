---
Toast
---

<script setup>
import {
ToastMessage, IconEnum
} from "@ghentcdh/ui";

const toast = IconEnum;
</script>
# ToastMessage

## Success
<ToastMessage message="success" type="success" />
## Error
<ToastMessage message="error" type="error" />
## Info
<ToastMessage message="info" type="info" />
## Warning
<ToastMessage message="warning" type="warning" />