import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total quantity and total cost
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {cartItems.length === 0 ? (
        <p className="empty-list">Your cart is empty</p>
      ) : (
        <div className="cart-container">
          {cartItems.map((item) => (
            <div className="cart-item1" key={item.id}>
              <CartItem item={item} />
            </div>
          ))}

          <div className="cart-summary">
            <span>Total Items: {totalQuantity} </span>
            <span>Total Cost: ${totalCost.toFixed(2)}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
