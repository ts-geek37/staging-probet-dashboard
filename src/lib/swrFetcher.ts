export async function swrFetcher<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}
