module.exports = {
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    }
  },
  test: /\.vue(\.erb)?$/,
  use: [{
    loader: 'vue-loader'
  }]
}
