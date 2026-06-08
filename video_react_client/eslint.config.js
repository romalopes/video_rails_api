import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", ".vercel"]),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    test: {
      environment: "jsdom",

      coverage: {
        provider: "v8",

        reporter: ["text", "html", "json"],

        include: ["src/**/*.{js,jsx}"],

        exclude: ["src/test/**", "node_modules/**"],

        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80,
        },
      },
    },
  },
]);

// export default defineConfig({
//   test: {
//     environment: "jsdom",

//     coverage: {
//       provider: "v8",

//       reporter: [
//         "text",
//         "html",
//         "json",
//       ],

//       include: [
//         "src/**/*.{js,jsx}",
//       ],

//       exclude: [
//         "src/test/**",
//         "node_modules/**",
//       ],

//       thresholds: {
//         lines: 80,
//         functions: 80,
//         branches: 80,
//         statements: 80,
//       },
//     },
//   },
// });
