<template>
  <v-card outlined ma-2 pa-2>
    <v-row no-gutters>
      <!-- Product Info Section -->
      <v-col>
        <!-- Editable Fields Section -->
        <div v-if="isEditing">
          <v-text-field
            v-model="editedProduct.name"
            label="Product Name"
            outlined
            dense
          ></v-text-field>
          <v-textarea
            v-model="editedProduct.description"
            label="Product Description"
            outlined
            dense
          ></v-textarea>
          <v-text-field
            v-model="editedProduct.price"
            label="Price"
            outlined
            dense
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="editedProduct.rating"
            label="Rating"
            outlined
            dense
            type="number"
            min="1"
            max="5"
          ></v-text-field>
          <v-text-field
            v-model="editedProduct.stock"
            label="Stock"
            outlined
            dense
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="editedProduct.image"
            label="Image URL"
            outlined
            dense
          ></v-text-field>
          <v-text-field
            v-model="editedProduct.category"
            label="Category"
            outlined
            dense
          ></v-text-field>
        </div>

        <!-- Product Info Display Section (when not editing) -->
        <div v-else>
          <v-card-title class="text-wrap">{{ product.data.name }}</v-card-title>
          <v-row>
            <v-col class="d-flex flex-column align-center justify-center" style="gap: 10px">
              <v-rating
                :model-value="product.data.rating"
                color="amber"
                item-value="product.data.rating"
                max="5"
                :size="24"
                readonly
              />
              <v-chip variant="outlined" color="green" text-color="white" label>
                Price: ${{ product.data.price }}
              </v-chip>
              <v-chip variant="outlined" color="blue" text-color="white" label>
                Stock: {{ product.data.stock }}
              </v-chip>
            </v-col>
          </v-row>
          <v-img :src="product.data.image" :alt="product.data.name" height="200px" class="ma-4"></v-img>

          <!-- Description -->
          <v-card-text>{{ product.data.description }}</v-card-text>
        </div>

        <!-- Buttons Section -->
        <div class="d-flex justify-end mt-3">
          <v-btn v-if="isEditing" @click="cancelEdit" color="red" outlined>
            Cancel
          </v-btn>
          <v-btn
            v-if="isEditing"
            @click="updateProduct"
            color="green"
            outlined
          >
            Update
          </v-btn>
          <v-btn v-else @click="editProduct" color="primary" outlined>
            Modify
          </v-btn>
          
          <!-- Delete Button -->
          <v-btn @click="deleteProduct" color="red" outlined>
            Delete
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts" setup>
import { defineProps, ref, watchEffect } from "vue";
import { useProductStore } from "../stores/ProductStore";
import { ProductDoc } from "../types/product";

const props = defineProps({
  product: {
    type: Object as () => ProductDoc,
    required: true,
  },
});

const productStore = useProductStore(); // Access the product store
const isEditing = ref(false);

// Make a copy of the product to be editable
const editedProduct = ref({ ...props.product.data });

const editProduct = () => {
  isEditing.value = true;
};

const cancelEdit = () => {
  isEditing.value = false;
  editedProduct.value = { ...props.product.data }; // Reset to original values
};

const updateProduct = async () => {
  const userConfirmed = window.confirm("Are you sure you want to apply these changes?");
  if (userConfirmed) {
    // Update product in Firebase
    await productStore.updateProductInFirebase(props.product.id, editedProduct.value);
    
    // Update the local product data in store
    productStore.updateProductInStore(props.product.id, editedProduct.value); 
    
    // Exit edit mode
    isEditing.value = false; 
  }
};

const deleteProduct = async () => {
  const userConfirmed = window.confirm("Are you sure you want to delete this product?");
  if (userConfirmed) {
    // Delete the product from Firestore
    await productStore.deleteProductFromFirebase(props.product.id);
    
    // Remove the product from the store after deletion
    productStore.removeProductFromStore(props.product.id);
  }
};

watchEffect(() => {
  // Watch for changes in the store's products array
  const updatedProduct = productStore.products.find(p => p.id === props.product.id);
  if (!updatedProduct) {
    // If the product is no longer found in the store, navigate away or handle it
    console.log('Product deleted, navigating away...');
    // You could add a navigation action or another user-friendly solution here
  }
});
</script>
