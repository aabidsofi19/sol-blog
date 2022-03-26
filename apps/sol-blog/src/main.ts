import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
// import "@solana/wallet-adapter-vue-ui/src/"
// import "@solana/wallet-adapter-vue-ui/styles.css";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/beagle.css";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import { Buffer } from "buffer";
import "flowbite";

// Day.js
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

// console.log(medium)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

globalThis.Buffer = Buffer;
createApp(App).use(router).mount("#app");
