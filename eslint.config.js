import { fixupConfigRules } from "@eslint/compat";
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  {languageOptions: { globals: globals.browser }},{
    rules: {
        "no-case-declarations": "off",
        "no-unused-vars": "off",
        "prefer-const": ["off", { "ignoreReadBeforeAssign": true }]
    }
},
  pluginJs.configs.recommended,
  { files: ["**/*.jsx"], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  ...fixupConfigRules(pluginReactConfig),
];

