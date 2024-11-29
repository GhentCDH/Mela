<script setup lang="ts">
const route = useRoute();
const items = [
  {
    icon: "pi pi-database",
    label: "Editions",
    to: "/editions/",
  },
  {
    icon: "pi pi-book",
    label: "Manuscripts",
    to: "/manuscripts/",
  },
  {
    icon: "pi pi-users",
    label: "Authors",
    to: "/authors/",
  },
];
const enditems = [
  {
    icon: "pi pi-user",
    label: "Profile",
    to: "/profile",
  },
];

const allItems = [...items, ...enditems];

const highlightedItems = computed(() => {
  return allItems.map((item) => {
    if (item.to === "/") {
      if (route.path === "" || route.path === "/") {
        return { ...item, class: "p-highlight" };
      }
      return item;
    } else if (route.path.startsWith(item.to)) {
      return { ...item, class: "p-highlight" };
    }
    return item;
  });
});

//Authentication
const { status, data: token, signIn, signOut } = await useAuth();

async function logout() {
  await signOut({ callbackUrl: "/auth/logout" });
}

const loggedIn = computed(() => status.value === "authenticated");

async function login() {
  //const signInOptions = {callbackUrl: "http://localhost:9000", redirect: true, external: true}
  const signInOptions = { redirect: true, external: false };

  await signIn("keycloak", signInOptions);
}
</script>

<template>
  <div class="container">
    <Menubar :model="highlightedItems">
      <template #item="{ item }">
        <Link
          v-ripple
          class="p-menuitem-link"
          :to="item.to"
          tabindex="-1"
          aria-hidden="true"
          data-pc-section="action"
        >
          <span
            class="p-menuitem-icon"
            :class="item.icon"
            data-pc-section="icon"
          >
        </span>
          <span class="p-menuitem-text" data-pc-section="label">
            {{ item.label }}
          </span>
        </Link>
      </template>
      <template #end>
        <Button v-if="loggedIn" :disabled="!loggedIn" @click="logout"
          >Logout&nbsp;{{ token.user.email }}</Button
        >
        <Button v-else :disabled="loggedIn" @click="login">Login</Button>
      </template>
    </Menubar>
    <NotificationMessages />
    <slot />
  </div>
</template>
