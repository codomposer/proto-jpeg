import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  extensions: ["plugin:@typescript-eslint/eslint-recommended"],
});

const eslintConfig = {
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  rules: {
    '@typescript-eslint/no-require-imports': 'error',
  },
};

export default eslintConfig;