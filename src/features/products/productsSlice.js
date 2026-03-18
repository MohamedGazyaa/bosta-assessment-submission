import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) return rejectWithValue(response.status);
    const data = await response.json();
    return data.map((p) => ({ ...p, image: p.image.replace(/^["']|["']$/g, '') }));
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) return rejectWithValue(response.status);
    const p = await response.json();
    return { ...p, image: p.image.replace(/^["']|["']$/g, '') };
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productData, { rejectWithValue }) => {
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    if (!response.ok) return rejectWithValue(response.status);
    return response.json();
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedProduct: null,
    selectedStatus: 'idle',
    selectedError: null,
    createStatus: 'idle',
    createError: null,
  },
  reducers: {
    resetCreateStatus(state) {
      state.createStatus = 'idle';
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.selectedStatus = 'loading';
        state.selectedError = null;
        state.selectedProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = 'succeeded';
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = 'failed';
        state.selectedError = action.error.message;
      })

      .addCase(createProduct.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.createStatus = 'succeeded';
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.error.message;
      });
  },
});

export const { resetCreateStatus } = productsSlice.actions;
export default productsSlice.reducer;