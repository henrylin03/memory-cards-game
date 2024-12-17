import { defineConfig } from "cypress";

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 8000,
  e2e: {
    baseUrl: "http://localhost:5173"
  },
});
