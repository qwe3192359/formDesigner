module.exports = {
    productionSourceMap: false,
    devServer: {
        port: 8082,
        proxy: {
            '/biz': {
                target: 'http://192.168.0.201:9002/'
            },
            '/serve': {
                target: 'http://192.168.0.201:9002/biz/',
                pathRewrite: {'^/serve' : ''}
            },
            '/sudong': {
                target: 'http://192.168.0.120:8080/biz/',
                pathRewrite: {'^/sudong' : ''}
            }
        }

    }
};