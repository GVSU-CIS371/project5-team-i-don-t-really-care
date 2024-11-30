import { createApp } from "vue";
import { createPinia } from "pinia";
import { createVuetify } from "vuetify";
import App from "./App.vue";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import { fa } from "vuetify/iconsets/fa";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import router from "./router";

const vuetify = createVuetify({
    icons: {
        defaultSet: "mdi",
        aliases,
        sets: { mdi, fa },
    },

    components,
    directives,
});
const pinia = createPinia();
createApp(App).use(vuetify).use(pinia).use(router).mount("#app");
