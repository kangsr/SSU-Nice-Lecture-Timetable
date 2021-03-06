const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  lintOnSave: false,
  pages: {
    index: {
      entry: "src/index.js",
      template: "public/index.html",
      filename: "index.html"
    }
  },
  devServer: {
    clientLogLevel: "warning",
    disableHostCheck: true,
	hot: true,
    contentBase: "dist",
    compress: true,
    open: true,
    overlay: { warnings: false, errors: true },
    publicPath: "/",
    quiet: true,
    watchOptions: {
      poll: false,
      ignored: /node_modules/
    },
	proxy: {
      '/backend':{
        "target":'http://193.122.127.54:3000',
        "pathRewrite":{'^/backend':''},
        "changeOrigin":true,
        "secure":false
      }
    },
  },

  chainWebpack: config => {
    config.plugins.delete("prefetch-index"),
      config.module
        .rule("vue")
        .use("vue-loader")
        .tap(args => {
          args.compilerOptions.whitespace = "preserve";
        });
  },
  productionSourceMap: false,
  assetsDir: "./assets/",
  configureWebpack: {
    plugins: [
      new CopyPlugin([
          { from: "src/assets/images", to: "assets/images" },
        ],
      ),
    ]
  }
};
