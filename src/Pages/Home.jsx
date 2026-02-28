import { useEffect, useState } from "react";
import { getProducts } from "../services/productsApi";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ modal state
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // NOTE: your getProducts(offset, limit)
        const data = await getProducts(0, 180);
        setProducts(data);
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ✅ close modal on ESC
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setSelectedProduct(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
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

            <h3 style={{ marginTop: 10 }}>{product.title}</h3>
            <p style={{ fontWeight: "bold" }}>${product.price}</p>

            {/* ✅ short description (optional) */}
            <p
              style={{
                opacity: 0.85,
                marginTop: 8,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {product.description}
            </p>

            {/* ✅ Details button */}
            <button
              onClick={() => setSelectedProduct(product)}
              style={{
                marginTop: 10,
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #4f7cff",
                background: "transparent",
                color: "#4f7cff",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Details
            </button>
          </div>
        ))}
      </div>

      {/* ✅ Floating Modal */}
      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 9999,
          }}
        >
          {/* stop close when clicking inside */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(700px, 95vw)",
              background: "#1b1b1b",
              color: "white",
              borderRadius: 14,
              border: "1px solid #333",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", gap: 14, padding: 16 }}>
              <img
                src={selectedProduct.images?.[0]}
                alt={selectedProduct.title}
                style={{
                  width: 220,
                  height: 220,
                  objectFit: "cover",
                  borderRadius: 12,
                  border: "1px solid #333",
                }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                  <h2 style={{ margin: 0 }}>{selectedProduct.title}</h2>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    style={{
                      background: "transparent",
                      border: "1px solid #555",
                      color: "white",
                      borderRadius: 10,
                      padding: "6px 10px",
                      cursor: "pointer",
                      height: 36,
                    }}
                  >
                    ✕
                  </button>
                </div>

                <p style={{ fontSize: 18, fontWeight: 700, marginTop: 10 }}>
                  ${selectedProduct.price}
                </p>

                <p style={{ opacity: 0.9, lineHeight: 1.6 }}>
                  {selectedProduct.description}
                </p>

                <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                  <button
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "none",
                      background: "#4f7cff",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    style={{
                      flex: 1,
                      padding: "10px 12px",
                      borderRadius: 10,
                      border: "1px solid #555",
                      background: "transparent",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: 700,
                    }}
                  >
                    Close
                  </button>
                </div>

                <p style={{ marginTop: 10, opacity: 0.7, fontSize: 12 }}>
                  Tip: click outside or press ESC to close
                  test 7.43
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}