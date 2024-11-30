import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";

export const useProductStore = defineStore("ProductStore", {
    state: () => ({
        products: [] as ProductDoc[], // State initialized as an empty array
    }),

    actions: {
        /**
         * Initializes the products state with initProducts.
         */
        init() {
            console.log("Initializing products...");
            this.products = initProducts; // Ensure this points to `initProducts`
            console.log("Store products after init:", this.products);
        },

        /**
         * Filters products by a specific category.
         * @param {string} category - The category to filter by.
         * @returns {ProductDoc[]} - The filtered products.
         */
        filterByCategory(category: string): ProductDoc[] {
            return this.products.filter(
                (product) => product.data.category === category
            );
        },

        /**
         * Filters products with a rating above a minimum value.
         * @param {number} minRating - The minimum rating threshold.
         * @returns {ProductDoc[]} - The filtered products.
         */
        filterByRating(minRating: number): ProductDoc[] {
            return this.products.filter(
                (product) => product.data.rating >= minRating
            );
        },
    },
});
