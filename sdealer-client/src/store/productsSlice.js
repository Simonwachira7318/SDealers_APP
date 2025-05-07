// src/store/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch categories');
    }
  }
);

// Async thunk for fetching products by category
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ categoryId, searchQuery = '', sortOption = 'latest' }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products`, {
        params: {
          category: categoryId,
          search: searchQuery,
          sort: sortOption
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Async thunk for fetching product details
export const fetchProductDetails = createAsyncThunk(
  'products/fetchProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch product details');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    categories: [],
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
    searchQuery: '',
    sortOption: 'latest'
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Products
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Product Details
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearchQuery, setSortOption, clearCurrentProduct } = productsSlice.actions;

export default productsSlice.reducer;