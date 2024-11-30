<template>
    <v-container>
        <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="product in clothing"
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

const productStore = useProductStore();
const clothing = productStore.filterByCategory("Clothing");
</script>
