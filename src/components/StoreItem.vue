<template>
    <v-card outlined ma-2 pa-2>
        <v-row no-gutters>
            <!-- Product Info Section -->
            <v-col>
                <v-card-title class="text-wrap">{{
                    product.data.name
                }}</v-card-title>
                <v-row>
                    <v-col
                        class="d-flex flex-column align-center justify-center"
                        style="gap: 10px"
                    >
                        <v-rating
                            :model-value="product.data.rating"
                            color="amber"
                            item-value="product.data.rating"
                            max="5"
                            :size="24"
                            readonly
                        >
                        </v-rating>
                        <v-chip
                            variant="outlined"
                            color="green"
                            text-color="white"
                            label
                            >Price: ${{ product.data.price }}</v-chip
                        >
                        <v-chip
                            variant="outlined"
                            color="blue"
                            text-color="white"
                            label
                            >Stock: {{ product.data.stock }}</v-chip
                        >
                    </v-col>
                </v-row>
                <v-img
                    :src="product.data.image"
                    :alt="product.data.name"
                    height="200px"
                    class="ma-4"
                ></v-img>

                <!-- Description -->
                <v-card-text>{{ product.data.description }}</v-card-text>

                <!-- Price and Stock -->
            </v-col>
        </v-row>
    </v-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ProductDoc } from "../types/product";

// Define the product prop
defineProps({
    product: {
        type: Object as () => ProductDoc,
        required: true,
    },
});
</script>

//"ma-2 pa-2" class="same-size-box"
