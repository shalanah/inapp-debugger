import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "fs";
import path from "path";

const packageJson = JSON.parse(
  readFileSync(path.resolve(__dirname, "package.json"), "utf-8")
);
const inAppSpyVersion = packageJson.dependencies["inapp-spy"] || "unknown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __DEPENDENCY_VERSION__: JSON.stringify(inAppSpyVersion),
  },
  // base: "/inapp-debugger/", //no longer needed with https://inappdebugger.com
});
