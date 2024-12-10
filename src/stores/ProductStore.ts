import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { database } from "../firebase";  // Import Firebase database
import { ref, set } from "firebase/database";  // Import Firebase functions

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[], // State initialized as an empty array
  }),

  actions: {
    /**
     * Initializes the products state with initProducts and pushes the data to Firebase.
     */
    init() {
      console.log("Initializing products...");
      this.products = initProducts; // Set the products in the store
      console.log("Store products after init:", this.products);
      
      // Push the pre-initialized products data to Firebase
      this.pushDataToFirebase();
    },

    /**
     * Pushes the pre-initialized products to Firebase.
     */
    pushDataToFirebase() {
      initProducts.forEach((product) => {
        const productRef = ref(database, 'products/' + product.id);  // Reference to the product's node
        set(productRef, product.data)  // Push product data into Firebase
          .then(() => {
            console.log(`Product ${product.id} pushed successfully!`);
          })
          .catch((error) => {
            console.error("Error pushing data for product", product.id, ":", error);
          });
      });
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

    addProduct(product: ProductDoc) {
      this.products.push(product);
      console.log("Product added:", product);
    },
  },
});
