import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import inject from "@rollup/plugin-inject";
import { resolve } from "path";
import tsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  define: {
    // global: "window",
    "process.env.VUE_APP_VERSION": 1.0, //fix for process not defined
  },
  resolve: {
    alias: {
      "@/src": resolve(__dirname, "/src"),
      "@/components": resolve(__dirname, "/src/components"),
      "@/pages": resolve(__dirname, "/src/pages"),
      "@/composables": resolve(__dirname, "/src/composables"),
    },
  },
  test: {
    include: ["tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },

  // optimizeDeps: {
  //   exclude: ["@blocto/sdk"],
  // },
  build: {
    // commonjsOptions: {
    //   transformMixedEsModules: true,
    //   esmExternals: true,
    //   include: ["node_modules/**"],
    // },
  },

  plugins: [vue(), tsconfigPaths()],
  // build: {
  // 	rollupOptions: {
  // 		plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
  // 	},
  // },
});
