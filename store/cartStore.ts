import { create } from "zustand";

type CardItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
};

type CartStoreItem = {
  cart: CardItem[];
  addToCart: (item: CardItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};


export const useCartStore = create<CartStoreItem>((set) => ({
  cart: [],

  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ cart: [] }),
}));
