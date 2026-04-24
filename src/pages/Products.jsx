import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import styles from "./Products.module.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Bring in our global cart state and functions
  const { cartItems, addToCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearCart(); // Wipe the cart on logout
    navigate("/login");
  };

  // Helper function to check if an item is already in the cart
  const getItemQuantity = (id) => {
    const item = cartItems.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Store</h1>
        <div>
          {/* Quick inline style for the link so we don't have to touch CSS right now */}
          <Link 
            to="/cart" 
            style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
          >
            View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      <div className={styles.grid}>
        {products.map((product) => {
          const currentQuantity = getItemQuantity(product.id);

          return (
            <div key={product.id} className={styles.card}>
              <img src={product.thumbnail} alt={product.title} className={styles.image} />
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.description}>{product.description}</p>
              <div className={styles.price}>${product.price.toFixed(2)}</div>
              
              {/* Conditional rendering based on cart state */}
              {currentQuantity > 0 ? (
                <div className={styles.quantityControls}>
                  <button className={styles.qtyBtn} onClick={() => updateQuantity(product.id, -1)}>-</button>
                  <span className={styles.qtyValue}>{currentQuantity}</span>
                  <button className={styles.qtyBtn} onClick={() => updateQuantity(product.id, 1)}>+</button>
                </div>
              ) : (
                <button className={styles.addToCartBtn} onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;