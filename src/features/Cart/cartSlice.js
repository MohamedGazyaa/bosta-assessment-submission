import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? { items: JSON.parse(savedCart) } : { items: [] };
  } catch {
    return { items: [] };
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCart(),
  reducers: {
    addToCart(state, action) {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const existing = state.items.find((item) => item.id === action.payload);
      if (!existing) return;
      if (existing.quantity > 1) {
        existing.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    deleteFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, deleteFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
