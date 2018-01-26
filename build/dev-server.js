const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')

module.exports = function setupDeServer(app){
    clientConfig.entry.app = [
        'webpack-hot-middleware/client',
        clientConfig.entry.app
    ]
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
    const clientCompiler = webpack(clientConfig)
    app.use(
        require('webpack-dev-middleware')(clientCompiler,{
            state: {
                colors: true
            }
        })
    )
    app.use(require('webpack-hot-middleware')(clientCompiler))
}
