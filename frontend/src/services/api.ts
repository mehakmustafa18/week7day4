import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discount?: number;
  category: string;
  description: string;
  isNew?: boolean;
  nikePromo?: boolean;
  image: {
    url: string;
  };
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Cart {
  sessionId: string;
  items: CartItem[];
  total: number;
}

export interface AddToCartPayload {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity?: number;
  sessionId?: string;
}

export interface UpdateCartPayload {
  productId: string;
  quantity: number;
  sessionId?: string;
}

const SESSION_ID = 'sneaker-session-001';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
  }),
  tagTypes: ['Cart', 'Products'],
  endpoints: (builder) => ({
    // Products
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: ['Products'],
    }),

    // Cart
    getCart: builder.query<Cart, void>({
      query: () => `/cart?sessionId=${SESSION_ID}`,
      providesTags: ['Cart'],
    }),

    addToCart: builder.mutation<Cart, AddToCartPayload>({
      query: (payload) => ({
        url: '/cart/add',
        method: 'POST',
        body: { ...payload, sessionId: SESSION_ID },
      }),
      invalidatesTags: ['Cart'],
    }),

    updateCartItem: builder.mutation<Cart, UpdateCartPayload>({
      query: (payload) => ({
        url: '/cart/update',
        method: 'PATCH',
        body: { ...payload, sessionId: SESSION_ID },
      }),
      invalidatesTags: ['Cart'],
    }),

    removeCartItem: builder.mutation<Cart, string>({
      query: (productId) => ({
        url: `/cart/remove/${productId}?sessionId=${SESSION_ID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),

    clearCart: builder.mutation<Cart, void>({
      query: () => ({
        url: `/cart/clear?sessionId=${SESSION_ID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = apiSlice;
