import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity = 1) => {
        const existingCart = get().cart;
        const existingItem = existingCart.find(item => item.id === product.id);

        if (existingItem) {
          const updatedCart = existingCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          console.log(`🛒 Updated quantity of ${product.name} (ID: ${product.id}) to ${existingItem.quantity + quantity}`);
          set({ cart: updatedCart });
        } else {
          console.log(`🛒 Added ${quantity} of ${product.name} (ID: ${product.id}) to cart.`);
          const newCart = [...existingCart, { ...product, quantity }];
          set({ cart: newCart });
        }
      },

      removeFromCart: (id) => {
        const cart = get().cart;
        const removedItem = cart.find(item => item.id === id);
        console.log(`❌ Removed ${removedItem?.name} (ID: ${id}) from cart.`);
        const filteredCart = cart.filter(item => item.id !== id);
        set({ cart: filteredCart });
      },

      clearCart: () => {
        console.log("🧹 Cart cleared.");
        set({ cart: [] });
      },

      getTotalItemCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      }
    }),
    {
      name: "cart-storage",
      getStorage: () => sessionStorage 
    }
  )
);

export default useCartStore;
