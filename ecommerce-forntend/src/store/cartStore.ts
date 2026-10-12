import { create } from "zustand";
import type { Product } from "../types/product";
import type { CartItem } from "../types/cart";

interface CartStore {
    cartItems: CartItem[];

    addToCart: (product: Product) => void;

    increaseQuantity: (productid: number) => void;

    decreaseQuantity: (productid: number) => void;

    clearCart: () => void;

    getTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
    cartItems: [],

    addToCart: (product) => {
        set((state) => {
            const existingItem = state.cartItems.find(
                (item) =>
                    item.product.productId === product.productId
            );

            // Maximum 3 only for Laptop and Smartphone
            if (
                (product.productId === 1 || product.productId === 2) &&
                existingItem &&
                existingItem.quantity >= 3
            ) {
                alert("Maximum 3 items allowed for this product.");
                return state;
            }

            // If product already exists
            if (existingItem) {
                return {
                    cartItems: state.cartItems.map((item) =>
                        item.product.productId === product.productId
                            ? {
                                ...item,
                                quantity: item.quantity + 1
                            }
                            : item
                    )
                };
            }

            // If product does not exist
            return {
                cartItems: [
                    ...state.cartItems,
                    {
                        product: product,
                        quantity: 1
                    }
                ]
            };
        });
    },

    increaseQuantity: (productid) => {
        set((state) => {
            const existingItem = state.cartItems.find(
                (item) =>
                    item.product.productId === productid
            );

            // Maximum 3 only for Laptop and Smartphone
            if (
                (productid === 1 || productid === 2) &&
                existingItem &&
                existingItem.quantity >= 3
            ) {
                alert("Maximum 3 items allowed for this product.");
                return state;
            }

            return {
                cartItems: state.cartItems.map((item) =>
                    item.product.productId === productid
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                )
            };
        });
    },

    decreaseQuantity: (productid) => {
        set((state) => ({
            cartItems: state.cartItems
                .map((item) =>
                    item.product.productId === productid
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0)
        }));
    },

    clearCart: () => {
        set({
            cartItems: []
        });
    },

    getTotal: () => {
        const cartItems = get().cartItems;

        return cartItems.reduce(
            (sum, item) =>
                sum + item.product.price * item.quantity,
            0
        );
    }
}));