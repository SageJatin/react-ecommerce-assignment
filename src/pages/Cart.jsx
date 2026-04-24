import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate the grand total
  const totalCartValue = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Shopping Cart</h1>
        <Link to="/products" className={styles.backBtn}>
          Back to Products
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>Your cart is currently empty.</div>
      ) : (
        <>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className={styles.thumbnail}
                />
                
                <div className={styles.details}>
                  <h3 className={styles.title}>{item.title}</h3>
                  <div className={styles.price}>${item.price.toFixed(2)}</div>
                </div>

                <div className={styles.controls}>
                  <div className={styles.quantityGroup}>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className={styles.qtyValue}>{item.quantity}</span>
                    <button 
                      className={styles.qtyBtn} 
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Calculate subtotal for this specific item */}
                  <div className={styles.subtotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>

                <button 
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <span className={styles.totalLabel}>Total:</span>
            <span className={styles.totalValue}>${totalCartValue.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;