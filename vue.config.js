
module.exports = {
    publicPath: './',
    outputDir: 'dist',
    pages: {
        index: {
          entry: 'examples/main.js',
          template: 'public/index.html',
          filename: 'index.html'
        }
    }
}