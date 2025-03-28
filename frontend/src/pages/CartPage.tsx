import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/Cartitem";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  // Function to handle "Buy Books" button click
  const handleBuyBooks = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty! Add some books first.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      toast.success(
        "🎉 Congratulations! You've successfully purchased your books!",
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Optionally clear the cart after purchase (if implemented in context)
      // cart.clearCart();

      // Navigate to a confirmation or home page after purchase
      setTimeout(() => navigate("/projects"), 3000);
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item: CartItem) => (
              <tr key={item.bookID}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() =>
                      updateQuantity(item.bookID, item.quantity - 1)
                    }
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    onClick={() =>
                      updateQuantity(item.bookID, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeFromCart(item.bookID)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <button onClick={() => navigate("/projects")}>Continue Shopping</button>
      {/* Buy Books Button */}
      <button onClick={handleBuyBooks}>Buy Books</button>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default CartPage;
