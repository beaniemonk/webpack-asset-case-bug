const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


module.exports = {
    // cache: false,

    output: {
        path: path.join(__dirname, "dist")
    },

    module: {
        rules: [{
            test: /\.png$/,
            type: "asset/resource"
        }]
    },

    plugins: [
        new CleanWebpackPlugin()
    ]
};
