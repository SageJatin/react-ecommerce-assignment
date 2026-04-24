import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import styles from "./Products.module.css";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New state for our search bar
  const [searchTerm, setSearchTerm] = useState("");
  
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity, clearCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productData = await fetchAllProducts();
        setProducts(productData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearCart(); 
    navigate("/login");
  };

  const getItemQuantity = (id) => {
    const item = cartItems.find(cartItem => cartItem.id === id);
    return item ? item.quantity : 0;
  };

  // Filter the products array based on what the user types
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Store</h1>
        <div>
          <Link 
            to="/cart" 
            style={{ marginRight: '15px', textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}
          >
            View Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
          </Link>
          <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
        </div>
      </div>

      {/* The new Search Input */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.grid}>
        {/* We map over filteredProducts now, not the original products array */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const currentQuantity = getItemQuantity(product.id);

            return (
              <div key={product.id} className={styles.card}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.image}
                />
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.price}>${product.price.toFixed(2)}</div>

                {currentQuantity > 0 ? (
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(product.id, -1)}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{currentQuantity}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => updateQuantity(product.id, 1)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className={styles.addToCartBtn}
                    onClick={() => {
                      addToCart(product);
                      toast.success(`${product.title} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className={styles.noResults}>No products found matching "{searchTerm}"</div>
        )}
      </div>
    </div>
  );
};

export default Products;