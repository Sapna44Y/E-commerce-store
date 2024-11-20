import { useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../store/cartSlice";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const totalPrice = (item.price * item.quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div>
        <h3>{item.title}</h3>
        <p>Unit Price: {item.price}$</p>
        <p>Quantity: {item.quantity}</p>
        <p>Total Price: {totalPrice}$</p>
      </div>
      <div>
        <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
        <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
        <button onClick={() => dispatch(removeFromCart(item.id))}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
