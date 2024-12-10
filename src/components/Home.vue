<template>
    <v-container>
        <v-row>
            <v-col
                sm="6"
                md="4"
                lg="3"
                v-for="product in products"
                :key="product.id"
            >
                <StoreItem :product="product" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script lang="ts" setup>
import { useProductStore } from "../stores/ProductStore";
import StoreItem from "../components/StoreItem.vue";
import { onMounted, watch } from "vue";

// Access the product store
const productStore = useProductStore();

// Define a reactive products array to update the UI
const products = productStore.products;

// Fetch products from Firebase when component mounts
onMounted(async () => {
    // Initialize products if not already in Firebase
    await productStore.init();

    // Fetch products from Firebase
    await productStore.fetchProductsFromFirebase();
});

// Watch for changes in the store's products array to reflect updates
watch(
    () => productStore.products,
    () => {
        // This ensures the UI updates whenever the store's products change (e.g., after deletion)
        products.splice(0, products.length, ...productStore.products);
    }
);
</script>
