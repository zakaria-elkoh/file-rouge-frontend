import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Ensure it listens on all interfaces inside Docker
    port: 3000, // Ensure the correct port is used
    strictPort: true,
  },
});
