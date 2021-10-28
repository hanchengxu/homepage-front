const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin");//gzip压缩

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // publicPath: '/', // 基本路径
  publicPath: process.env.NODE_ENV === 'github' ? '/homepage-front/' : '/',
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  chainWebpack: (config) => {
    console.log();
    console.log('-----------------------------------');
    console.log('⚠️  public path : '+config.output.store.get('publicPath'));
    console.log('⚠️  build env   : '+process.env.NODE_ENV);
    console.log('-----------------------------------');
    // set svg-sprite-loader
    // 第一步：让其他svg loader不要对src/assets/imgs/svgs进行操作
    config.module.rule("svg").exclude.add(resolve("src/assets/imgs/svgs")).end();
    // 第二步：使用svg-sprite-loader 对 src/assets/imgs/svgs下的svg进行操作
    config.module
       .rule("icons")
       .test(/\.svg$/)
       .include.add(resolve("src/assets/imgs/svgs"))
       .end()
       .use("svg-sprite-loader")
       .loader("svg-sprite-loader")
       //定义规则 使用时 <svg class="icon"> <use xlink:href="#icon-svg文件名"></use>  </svg>
       .options({
         symbolId: "icon-[name]"
       })
       .end();
    config.plugin('html').tap(args => {
         args[0].title= '云雀之丘的时光'
         return args
       })  
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      return{
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,//压缩文件名
          threshold: 10240,//超过10K 压缩
          deleteOriginalAssets: false
        })]
      }
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    // Object.assign(config, {
    //   // 开发生产共同配置
    //   resolve: {
    //     alias: {
    //       '@': path.resolve(__dirname, './src'),
    //       '@c': path.resolve(__dirname, './src/components'),
    //       '@p': path.resolve(__dirname, './src/pages')
    //     } // 别名配置
    //   }
    // })
  },
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
  // css相关配置
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: false, // 开启 CSS source maps?
    // loaderOptions: {
    //   css: {}, // 这里的选项会传递给 css-loader
    //   postcss: {} // 这里的选项会传递给 postcss-loader
    // }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },
  parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0', // 允许外部ip访问
    port: 8033, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    }, // 错误、警告在页面弹出
    // proxy: {
    //   '/api': {
    //     target: 'http://www.baidu.com/api',
    //     changeOrigin: true, // 允许websockets跨域
    //     // ws: true,
    //     pathRewrite: {
    //       '^/api': ''
    //     }
    //   }
    // } // 代理转发配置，用于调试环境
  },
  // 第三方插件配置
  pluginOptions: {}
}