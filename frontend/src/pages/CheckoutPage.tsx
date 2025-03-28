import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";
import { CartItem } from "../types/Cartitem";

function CheckoutPage() {
  const navigate = useNavigate();
  const { title, bookID } = useParams(); // Extracts the title and bookID from the URL params
  const { addToCart } = useCart();
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    // Ensure bookID is present before fetching
    if (!bookID) {
      console.error("BookID is missing");
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:5000/Book/GetBook/${bookID}`
        );
        if (response.ok) {
          const data = await response.json();
          setPrice(data.price); // Sets the price from the API response
        } else {
          console.error("Failed to fetch book details");
        }
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };

    fetchBookDetails();
  }, [bookID]); // Only re-run if bookID changes

  const handleAddToCart = () => {
    if (!bookID) {
      alert("Error: Book ID is missing.");
      return;
    }

    const newItem: CartItem = {
      bookID: Number(bookID),
      title: title || "No Project Found",
      price: price > 0 ? price : 10, // Use fetched price, default to 10 if not available
      quantity: 1,
      subtotal: price > 0 ? price : 10,
      total: price > 0 ? price : 10,
    };

    addToCart(newItem);
    navigate("/cart"); // Redirect to cart after adding
  };

  return (
    <>
      <h2>Add {title} to Cart</h2>

      {/* Display price, with a fallback message if it's not fetched yet */}
      <div>
        <p>Price: ${price > 0 ? price.toFixed(2) : "Loading..."}</p>
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate("/projects")}>Go Back</button>
    </>
  );
}

export default CheckoutPage;
