var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var debug = process.env.NODE_ENV !== "production";

var paths = {
    src: __dirname + '/src',
    build: __dirname + '/build',
    tmp: __dirname + '/.tmp',
    index: __dirname + "/src/index.html",
    entry: __dirname + "/src/main.js",
    entryBuildFileName: "main.min.js"
}

module.exports = {
    context: path.join(__dirname, "src"),
    devtool: debug ? "inline-sourcemap" : null,
    entry: {
        bootstrap: "./bootstrap.js"
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/, loader: "babel-loader", exclude: /node_modules/,
                query: {
                    plugins: ["angular2-annotations", "transform-class-properties", "transform-decorators-legacy", "transform-flow-strip-types", "transform-runtime"],
                    presets: ['es2015', 'es2015-webpack', 'stage-0']
                }
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader")},
            {
                test: /\.scss$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader", "postcss-loader", "sass-loader")
            },
            {test: /\.html$/, loader: "file?name=[name].[ext]",},
            {test: /\.(woff|svg|ttf|eot)([\?]?.*)$/, loader: "file-loader?name=[name].[ext]"},
            {test: /\.(png|jpg)([\?]?.*)$/, loader: "file-loader?name=[name].[ext]"}
        ],
    },
    plugins: debug ? [
        new ExtractTextPlugin("[name].css"),
    ] : [
        new ExtractTextPlugin("[name].css"),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
    ],
    node: {
        fs: "empty"
    }
};
