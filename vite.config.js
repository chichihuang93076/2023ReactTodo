import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  //開發中或產品路徑
  base: process.env.NODE_ENV === "production" ? "/2023ReactTodo/" : "/",
  plugins: [react()],
});
