import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      carts: JSON.parse(localStorage.getItem("carts")) || [],
    };
  },
  mutations: {
    ADD_TO_CART(state, { userId, product }) {
      const userCart = state.carts.find(c => c.userId === userId);
      if (userCart) {
        const existing = userCart.items.find(i => i.id === product.id);
        if (existing) {
          existing.quantity++;
        } else {
          userCart.items.push({ ...product, quantity: 1 });
        }
      } else {
        state.carts.push({
          userId,
          items: [{ ...product, quantity: 1 }],
        });
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    REMOVE_FROM_CART(state, { userId, productId }) {
      const userCart = state.carts.find(c => c.userId === userId);
      if (userCart) {
        userCart.items = userCart.items.filter(i => i.id !== productId);
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    UPDATE_QUANTITY(state, { userId, productId, quantity }) {
      const userCart = state.carts.find(c => c.userId === userId);
      if (userCart) {
        const item = userCart.items.find(i => i.id === productId);
        if (item) item.quantity = quantity;
      }
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },

    CLEAR_CART(state, userId) {
      state.carts = state.carts.filter(c => c.userId !== userId);
      localStorage.setItem("carts", JSON.stringify(state.carts));
    },
  },
  getters: {
    getCartByUser: (state) => (userId) => {
      return state.carts.find(c => c.userId === userId)?.items || [];
    },
  },
});
