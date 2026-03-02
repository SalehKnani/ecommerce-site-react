import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import Checkout from "./Pages/Checkout";
import Navbar from "./components/Navbar";

import AuthProvider from "./context/AuthContext";
import CartProvider from "./context/CartContext"; // ✅ ADD
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;