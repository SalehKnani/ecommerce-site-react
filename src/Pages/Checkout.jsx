import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const navigate = useNavigate();

  const { cart, inc, dec, removeFromCart, clearCart, totalItems, totalPrice } =
    useContext(CartContext);

  function placeOrder() {
    // ✅ Here is where "purchase" happens (demo)
    alert("Order placed successfully!");
    clearCart();                 // 🔥 deletes from localStorage
    navigate("/", { replace: true }); // redirect home
  }

  if (!cart.length) {
    return (
      <div className="page">
        <div className="container">
          <h1>Cart</h1>
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
          <h1>Cart</h1>
          <button className="btn btn-secondary" onClick={clearCart}>
            Clear cart
          </button>
        </div>

        <div style={{ marginTop: 16 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                gap: 16,
                alignItems: "center",
                padding: 12,
                border: "1px solid #eee",
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: 70, height: 70, objectFit: "cover", borderRadius: 10 }}
              />

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700 }}>{item.title}</div>
                <div style={{ opacity: 0.7 }}>${Number(item.price || 0).toFixed(2)}</div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button className="btn btn-secondary" onClick={() => dec(item.id)}>
                  -
                </button>
                <div style={{ minWidth: 28, textAlign: "center" }}>{item.qty}</div>
                <button className="btn btn-secondary" onClick={() => inc(item.id)}>
                  +
                </button>
              </div>

              <div style={{ width: 110, textAlign: "right", fontWeight: 700 }}>
                ${(item.qty * Number(item.price || 0)).toFixed(2)}
              </div>

              <button className="btn btn-primary" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 16,
            padding: 16,
            border: "1px solid #eee",
            borderRadius: 12,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>Summary</div>
            <div style={{ opacity: 0.7 }}>{totalItems} item(s)</div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>
              Total: ${totalPrice.toFixed(2)}
            </div>
            <button className="btn btn-primary btn-large" style={{ marginTop: 8 }} onClick={placeOrder}>
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}