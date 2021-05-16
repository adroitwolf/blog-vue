module.exports = {
    runtimeCompiler: true,
    devServer:{
        port: 8848
    },
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('iview')
            .loader('iview-loader')
            .options({prefix: false})
    }
}