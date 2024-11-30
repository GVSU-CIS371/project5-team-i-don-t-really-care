<template>
    <v-container>
        <v-row>
            <v-col
                sm="6"
                md="4"
                lg="3"
                v-for="product in productStore.products"
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
import { onMounted } from "vue";

// Access the product store
const productStore = useProductStore();

// Call the `init` method on component mount
onMounted(() => {
    productStore.init();
});
</script>
