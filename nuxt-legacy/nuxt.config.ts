// https://nuxt.com/docs/api/configuration/nuxt-config
/*
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "primevue/resources/themes/aura-light-green/theme.css",
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "primeflex/primeflex.css",
    "~/assets/scss/main.scss",
    "@recogito/text-annotator/dist/text-annotator.css",
  ],
  routeRules: {
    // "/schema/**": { proxy: process.env.FRONTEND_BACKEND_SCHEMA_URL },
    // "/api/**": { proxy: process.env.FRONTEND_BACKEND_API_URL },
    "/api/**": { proxy: "http://mela.app.backend:8000/api/**" },
    "/schema/**": { proxy: "http://mela.app.backend:8000/schema/**" },
    "/auth/logout": {
      redirect: `${process.env.FRONTEND_KEYCLOAK_ISSUER}/protocol/openid-connect/logout?client_id=${process.env.FRONTEND_KEYCLOAK_CLIENT_ID}&post_logout_redirect_uri=${encodeURIComponent(process.env.AUTH_ORIGIN ?? "/")}`,
    },
    "/**": {ssr: false}
  },
  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@formkit/nuxt",
  ],
  auth: {
    baseURL: "/auth",
    provider: {
      type: "authjs",
    },
  },
  formkit: {
    autoImport: true,
  },
});
*/