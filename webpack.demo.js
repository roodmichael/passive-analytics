const resolve = require('path').resolve;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: "development",
    entry: "./src/index.ts",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
    },
    output: {
        path: resolve('./demo/js'),
        filename: "pa.js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
  };