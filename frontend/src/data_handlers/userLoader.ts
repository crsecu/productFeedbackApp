export function loginLoader() {
  const hashString = window.location.hash;
  const searchParamsHash = new URLSearchParams(hashString.substring(1));
  const accessTokenHash = searchParamsHash.get("access_token");

  if (accessTokenHash) {
    window.history.replaceState(null, "", "/login");
    return "newUser";
  }

  return null;
}
