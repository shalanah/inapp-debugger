import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/inapp-debugger/",
  // TODO: needed for GH pages subdir deploy :)g
});
