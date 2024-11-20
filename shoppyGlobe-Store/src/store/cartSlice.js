import { createSlice } from "@reduxjs/toolkit";

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    return serializedState ? JSON.parse(serializedState) : { items: [] };
  } catch (e) {
    console.warn("Could not load cart from localStorage", e);
    return { items: [] };
  }
};

// Initial state using data from localStorage if available
const initialState = loadFromLocalStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveToLocalStorage(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveToLocalStorage(state);
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) item.quantity += 1;
      saveToLocalStorage(state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
      saveToLocalStorage(state);
    },
  },
});

// function to save the cart state to localStorage
const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save cart to localStorage", e);
  }
};

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
