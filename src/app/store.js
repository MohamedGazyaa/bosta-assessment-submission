import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/Cart/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  try {
    localStorage.setItem('cart', JSON.stringify(store.getState().cart.items));
  } catch (e) {
    console.error('Failed to persist cart to localStorage:', e)
  }
});
