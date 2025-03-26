import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart, totalPrice } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "20px",
        background: "#f8f9fa",
        padding: "10px 15px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        fontSize: "16px",
      }}
      className="cart-summary"
    >
      <h3>Cart Summary</h3>
      <p>Items: {cart.length}</p>
      <p>Total: ${totalPrice.toFixed(2)}</p>
      <button onClick={() => navigate("/cart")}> 🛒</button>
    </div>
  );
};

export default CartSummary;
