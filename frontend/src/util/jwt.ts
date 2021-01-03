export default function tokenExpired() {
  const token = localStorage.getItem("key");
  if (token === null) return true;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return Date.now() <= JSON.parse(jsonPayload).exp * 1000 ? false : true;
}
