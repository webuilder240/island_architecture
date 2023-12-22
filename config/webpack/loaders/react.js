module.exports = {
  test: /\.jsx?$/, // .js および .jsx ファイルに適用
  exclude: /node_modules/, // node_modules 内のファイルを除外
  use: {
    loader: 'babel-loader', // babel-loader を使用
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'] // 必要なBabelプリセット
    }
  }
}
