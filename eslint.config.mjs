import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
export default [
    {
        ignores: ["**/node_modules/", ".dist/"],
        languageOptions: {
            globals: {
                ...globals.browser,
                process: "readonly",
            },
        },
        rules: {
            "no-unused-vars": "error",
            "no-unused-expressions": "error",
            "prefer-const": "error",
            "no-console": "warn",
            "no-undef": "error",
            "no-explicit-any": "off"
        },
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
];