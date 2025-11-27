export const API_URL = import.meta.env.VITE_API_BASE || "http://localhost:8080";

export async function api(path, opts = {}) {
  const { method = "GET", body, token } = opts;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  let data = {};
  try {
    data = await res.json();
  } catch (_) {
    data = {};
  }

  return { status: res.status, ok: res.ok, data };
}
