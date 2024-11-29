<script setup lang="ts">
useHead({
  title: "Profile",
});

const { status, data: token } = await useAuth();

const protectedResponse = ref("");
const protectedRoleResponse = ref("");

async function call_protected() {
  const { headers } = await useAuthorizationHeaders();
  try {
    protectedResponse.value = await $fetch("/api/administration", {
      headers: headers,
    });
  } catch (fetchError) {
    protectedResponse.value = fetchError as string;
  }
}

async function call_role_protected() {
  const { headers } = await useAuthorizationHeaders();
  try {
    protectedRoleResponse.value = await $fetch(
      "/api/administration/role_protected",
      {
        headers: headers,
      },
    );
  } catch (fetchError) {
    protectedRoleResponse.value = fetchError as string;
  }
}
</script>

<template>
  <div>
    <h2>Profile info page</h2>

    <p>
      <span>Status: {{ status }}</span>
    </p>

    <p v-if="token">
      <span>User name: '{{ token.user.name }}'</span>
    </p>

    <p v-if="token">
      <span>User email: '{{ token?.user.email }}'</span>
    </p>

    <p v-if="token">
      <span>User id: '{{ token.user.id }}'</span>
    </p>

    <p>
      <span>JWT token data:</span>
    </p>
    <pre>{{ token || "no token present, are you logged in?" }}{{}}</pre>

    <span><Button @click="call_protected">Protected API call</Button></span>

    <pre> {{ protectedResponse }}</pre>

    <span
      ><Button @click="call_role_protected"
        >Role Protected API call</Button
      ></span
    >

    <pre> {{ protectedRoleResponse }}</pre>
  </div>
</template>

<style>
pre {
  background-color: #f4f4f4;
  border: 1px solid #ddd;
  padding: 0em;
  overflow: auto;
  white-space: pre-wrap;
  word-wrap: break-word;
  width: 70vw;
}
</style>
