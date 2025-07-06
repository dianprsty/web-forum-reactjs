import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import daStyle from "eslint-config-dicodingacademy";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js, pluginReact },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],
  daStyle,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
]);
