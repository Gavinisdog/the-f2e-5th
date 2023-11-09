module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, 
    "vue/setup-compiler-macros": true,
  },
  extends: ["plugin:vue/vue3-essential", "xo", "prettier"],
  overrides: [
    {
      extends: ["xo-typescript"],
      files: ["*.ts", "*.tsx", "*.vue"],
    },
  ],
  parser: "vue-eslint-parser", 
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".vue"]
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {},
};
