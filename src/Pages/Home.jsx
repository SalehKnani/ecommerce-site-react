import { useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProducts(20);
        setProducts(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2 style={{ color: "red" }}>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "15px",
            }}
          >
            <img
              src={product.images?.[0]}
              alt={product.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>


            <p style={{ opacity: 0.85, marginTop: 8 }}>{product.description}</p>
          </div>
        ))}

        {/* {products.map((product) => (
          <div key={product.id} style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px"
          }}>
            <img
              src={product.images[0]}
              alt={product.title}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px"
              }}
            />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
}
