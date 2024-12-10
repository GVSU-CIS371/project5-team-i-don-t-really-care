<template>
    <v-container>
        <!-- Add Product Overlay -->
        <v-dialog v-model="showAddProductDialog" max-width="600">
            <v-card>
                <v-card-title class="headline">Add New Product</v-card-title>
                <v-card-text>
                    <v-form ref="addProductForm">
                        <v-text-field
                            v-model="newProduct.name"
                            label="Product Name"
                            required
                        />
                        <v-text-field
                            v-model="newProduct.image"
                            label="Image URL"
                            required
                        />
                        <v-textarea
                            v-model="newProduct.description"
                            label="Description"
                            required
                        />
                        <v-text-field
                            v-model="newProduct.rating"
                            label="Rating"
                            type="number"
                            required
                        />
                        <v-text-field
                            v-model="newProduct.price"
                            label="Price"
                            type="number"
                            required
                        />
                        <v-text-field
                            v-model="newProduct.stock"
                            label="Stock"
                            type="number"
                            required
                        />
                        <v-text-field
                            v-model="newProduct.category"
                            label="Category"
                            required
                        />
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="addProduct">Add</v-btn>
                    <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- Open Overlay Button -->
        <v-btn color="primary" dark @click="openDialog"> Add Product </v-btn>
    </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useProductStore } from "../stores/ProductStore";

const productStore = useProductStore();

const showAddProductDialog = ref(false);

const newProduct = ref({
    name: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    image: "",
    category: "",
});

const openDialog = () => {
    showAddProductDialog.value = true;
};

const closeDialog = () => {
    showAddProductDialog.value = false;
};

const addProduct = async () => {
    const confirmed = window.confirm(
        "Are you sure you want to add this product?"
    );
    if (!confirmed) return;

    try {
        productStore.addProduct({
            id: Math.random().toString(36).substring(2, 9),
            data: { ...newProduct.value },
        });
        // Reset fields and close dialog
        newProduct.value = {
            name: "",
            description: "",
            price: 0,
            rating: 0,
            stock: 0,
            image: "",
            category: "",
        };
        showAddProductDialog.value = false;

        alert("Product added successfully!");
    } catch (error) {
        console.error("Error adding product:", error);
        alert("Failed to add product.");
    }
};
</script>
