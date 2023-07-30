module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@lib/": "./src/lib",
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@stores": "./src/stores",
            "@constants": "./src/constants",
            "@src": "./src",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      ],
    ],
  };
};
