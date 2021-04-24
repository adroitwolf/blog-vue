const webpack = require("webpack")
module.exports = {
  devServer:{
    overlay:{
      warnings: false,
      errors: false
    }
  },
 configureWebpack: {
   plugins: [
     new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       "window.jQuery": "jquery",
       Popper: ["popper.js", "default"]
     })
   ]
 }
};