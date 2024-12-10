import { defineStore } from "pinia";
import { ProductDoc } from "../types/product";
import { initProducts } from "../data-init";
import { database } from "../firebase";  // Import Firebase database
import { ref, set, update, remove, get } from "firebase/database";  // Import Firebase functions

export const useProductStore = defineStore("ProductStore", {
  state: () => ({
    products: [] as ProductDoc[], // State initialized as an empty array
    isInitialized: false, // Flag to track initialization status
  }),

  actions: {
    /**
     * Initializes the products state with initProducts and pushes the data to Firebase.
     * This ensures products are only initialized once.
     */
    async init() {
      // Initialize only if the products list is empty
      if (this.products.length > 0 || this.isInitialized) {
        return; // Skip initialization if products already exist or it's already initialized
      }

      console.log("Initializing products...");

      // Check if products already exist in Firebase to prevent overwriting
      const productsRef = ref(database, 'products');
      const snapshot = await get(productsRef);
      if (!snapshot.exists()) {
        // If products don't exist, push the pre-initialized products
        this.pushDataToFirebase();
      }

      // Load products from Firebase after checking initialization
      await this.fetchProductsFromFirebase();

      // Set the flag to true to prevent re-initializing on subsequent visits
      this.isInitialized = true;
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
     * Fetches all products from Firebase and updates the store.
     */
    async fetchProductsFromFirebase() {
      const productsRef = ref(database, 'products');
      try {
        const snapshot = await get(productsRef);
        if (snapshot.exists()) {
          const products = snapshot.val();
          // Map Firebase data into the format your store uses
          this.products = Object.keys(products).map(key => ({
            id: key,
            data: products[key]
          }));
        } else {
          console.log("No products available in Firebase.");
        }
      } catch (error) {
        console.error("Error fetching products from Firebase:", error);
      }
    },

    /**
     * Updates a product in Firebase and store after editing.
     */
    updateProductInFirebase(productId: string, updatedProduct: ProductDoc) {
      const productRef = ref(database, 'products/' + productId);
      update(productRef, updatedProduct.data)
        .then(() => {
          console.log("Product updated in Firebase successfully!");
          // After Firebase update, also update the product in the store
          this.updateProductInStore(productId, updatedProduct);
        })
        .catch((error) => {
          console.error("Error updating product in Firebase:", error);
        });
    },

    /**
     * Updates the product in the store (for local state).
     */
    updateProductInStore(productId: string, updatedProduct: ProductDoc) {
      const productIndex = this.products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        this.products[productIndex].data = updatedProduct.data;
      } else {
        console.error("Product not found in store");
      }
    },

    /**
     * Deletes a product from Firebase and removes it from the store.
     */
    deleteProductFromFirebase(productId: string) {
      const productRef = ref(database, 'products/' + productId); // Reference to the product in Firebase
      remove(productRef)
        .then(() => {
          console.log(`Product ${productId} deleted from Firebase successfully!`);
          // After Firebase deletion, also remove the product from the store
          this.removeProductFromStore(productId);
        })
        .catch((error) => {
          console.error("Error deleting product from Firebase:", error);
        });
    },

    /**
     * Removes a product from the store (for local state).
     */
    removeProductFromStore(productId: string) {
      const productIndex = this.products.findIndex(product => product.id === productId);
      if (productIndex !== -1) {
        // Remove the product using slice to trigger reactivity
        this.products = [
          ...this.products.slice(0, productIndex),
          ...this.products.slice(productIndex + 1)
        ];
        console.log(`Product ${productId} removed from the store.`);
      }
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

    /**
     * Adds a new product to the store and Firebase.
     * @param {ProductDoc} product - The new product to add.
     */
    addProduct(product: ProductDoc) {
      this.products.push(product);
      console.log("Product added:", product);
      const productRef = ref(database, 'products/' + product.id);
      set(productRef, product.data)
        .then(() => {
          console.log("Product added to Firebase successfully!");
        })
        .catch((error) => {
          console.error("Error adding product to Firebase:", error);
        });
    },
  },
});
