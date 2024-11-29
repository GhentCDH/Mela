export const useAuthorizationHeaders = async () => {
  const { getSession, data: token } = await useAuth();
  // Refresh session (and token if necessary)
  await getSession();
  const access_token = token.value ? token.value["accessToken"] : "";
  const headers = { authorization: `Bearer ${access_token}` };

  return { headers };
};
