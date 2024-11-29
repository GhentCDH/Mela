// file: ~/middleware/authentication.global.ts

/**
 * Middleware for authentication.
 * This checks if the user is authenticated and if the user has the required role.
 * If a required role is configured, the role is checked and the user is redirected to the sign-in page if the user does not have the required role.
 * If no required role is configured, the user is redirected to the sign-in page if the user is not authenticated.
 *
 * To configure the required role, use the `role_required` meta field in the route definition.
 *
 * Note that the list of roles is provided by the authentication provider i.e. Keycloak.
 * For page based middleware config:
 *
 * definePageMeta({
 *   middleware: "authentication",
 *   role_required: "admin",
 * });
 *
 * @param to - The route object representing the target route.
 * @returns A promise that resolves to the result of the authentication process.
 */
export default defineNuxtRouteMiddleware((to) => {
  const { status, data: token, signIn } = useAuth();

  const role_required = to.meta.role_required;

  //If no role is required, we simply check if the user is authenticated
  if (!role_required && status.value === "authenticated") {
    console.log("No role required, user is authenticated");
    return;
  }

  if (
    role_required &&
    token.value &&
    token.value.user &&
    token.value.user.roles
  ) {
    console.log(
      "Custom authentication middleware called, check role and redirect to sign",
      "required role",
      role_required,
      "user roles",
      JSON.stringify(token.value.user.roles),
    );
    if (token.value.user.roles.includes(role_required)) {
      console.log("User has required role", role_required);
      return;
    } else {
      console.log("User does not have required role");
      return signIn(undefined, { callbackUrl: to.path }) as ReturnType<
        typeof navigateTo
      >;
    }
  }

  /**
   * We cannot directly call and/or return `signIn` here as `signIn` uses async composables under the hood, leading to "nuxt instance undefined errors", see https://github.com/nuxt/framework/issues/5740#issuecomment-1229197529
   *
   * So to avoid calling it, we return it immediately.
   */
  return signIn(undefined, { callbackUrl: to.path }) as ReturnType<
    typeof navigateTo
  >;
});
