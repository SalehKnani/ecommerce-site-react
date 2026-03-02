import { createContext, useMemo, useState } from "react";

export const CartContext = createContext(null);

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
}

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(() => loadCart());

  function persist(next) {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  // item: { id, title, price, image }
  function addToCart(item) {
    persist(
      (() => {
        const exists = cart.find((x) => x.id === item.id);
        if (exists) {
          return cart.map((x) =>
            x.id === item.id ? { ...x, qty: x.qty + 1 } : x
          );
        }
        return [...cart, { ...item, qty: 1 }];
      })()
    );
  }

  function removeFromCart(id) {
    persist(cart.filter((x) => x.id !== id));
  }

  function inc(id) {
    persist(cart.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)));
  }

  function dec(id) {
    persist(
      cart.map((x) =>
        x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x
      )
    );
  }

  function clearCart() {
    persist([]);
    // optional hard delete key:
    // localStorage.removeItem("cart");
  }

  const totalItems = useMemo(
    () => cart.reduce((sum, x) => sum + x.qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, x) => sum + x.qty * Number(x.price || 0), 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        inc,
        dec,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}