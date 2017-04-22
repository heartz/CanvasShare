var config = {
  entry: './main.jsx',
  output: {
    path:__dirname +'/public' ,
    filename: 'bundle.js',
  },
  devServer: {
    inline: true,
    port: 8080
  },
	
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        },{
          loader: "css-loader"
        }, ]
      },
    ]
  }
}

module.exports = config;