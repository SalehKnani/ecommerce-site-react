
const BASE_URL = "https://api.escuelajs.co/api/v1";

export async function getProducts(offset = 0, limit = 180) {
  const res = await fetch(`${BASE_URL}/products?offset=${offset}&limit=${limit}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}
