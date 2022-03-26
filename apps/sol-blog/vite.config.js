import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {},
    "process.env.VUE_APP_VERSION": 1.0, //fix for process not defined
  },
  resolve: {
    alias: {
      "@/src": resolve(__dirname, "/src"),
    },
  },
  test: {
    include: ["tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
  plugins: [vue(), tsconfigPaths()],
  // build: {
  // 	rollupOptions: {
  // 		plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
  // 	},
  // },
});
