import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "./components/Home.vue";
import ElectronicsView from "./components/Electronics.vue";
import ClothingView from "./components/Clothing.vue";
import GroceriesView from "./components/Groceries.vue";
import BestSellerView from "./components/BestSeller.vue";
import AddProductView from "./components/AddProductView.vue";

const routes = [
    {
        path: "/",
        name: "home",
        props: true,
        component: HomeView,
    },
    {
        path: "/electronics",
        name: "electronics",
        component: ElectronicsView,
    },
    {
        path: "/clothing",
        name: "clothing",
        component: ClothingView,
    },
    {
        path: "/groceries", // Dynamic route for product details
        name: "groceries",
        props: true,
        component: GroceriesView,
    },
    {
        path: "/bestseller", // Dynamic route for product details
        name: "bestseller",
        props: true,
        component: BestSellerView,
    },
    {
        path: "/addproduct",
        name: "addproduct",
        props: true,
        component: AddProductView,
    },
];

// Sort routes by name or any other specific order you prefer
routes.sort((a, b) => a.name.localeCompare(b.name));

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
