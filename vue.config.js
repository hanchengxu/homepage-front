const path = require('path')
const CompressionPlugin = require("compression-webpack-plugin");//gzip压缩

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages:{
    main:{
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    },
    main_cn: {
      entry: 'src/main.js',  // 另一个入口文件
      template: 'public/index_cn.html', // 另一个 HTML 模板
      filename: 'index_cn.html'  // 生成的 HTML 文件名
    }
  },
  // publicPath: '/', // 基本路径
  //github会改变根路径，配合github page 默认域名。但自定义路由后不必使用
  publicPath: process.env.NODE_ENV === 'github' ? '/homepage-front/' : './',
  outputDir: 'dist', // 输出文件目录
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  // webpack配置
  chainWebpack: (config) => {
    console.log();
    console.log('-----------------------------------');
    console.log('⚠️  public path : '+config.output.store.get('publicPath'));
    console.log('⚠️  build env   : '+process.env.NODE_ENV);
    console.log('⚠️  api host    : '+process.env.VUE_APP_API_HOST);
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
    // config.plugin('html').tap(args => {
    //      args[0].title= '云雀之丘的时光'
    //      return args
    //    })  
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
    
    config.plugins.delete('prefetch');
    
    config.optimization.splitChunks({
      chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
      minSize:  500000,         //字节 引入的文件大于30kb才进行分割
      maxSize: 500000,         //100kb，尝试将大于100kb的文件拆分成n个100kb的文件
      minChunks: 1,           //模块至少使用次数
      maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
      automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          // filename: 'vendors.js',
        },
        // default: { //默认打包模块
        //   priority: -20,
        //   reuseExistingChunk: true, //模块嵌套引入时，判断是否复用已经被打包的模块
        //   // filename: 'common.js'
        // }
      }
    });
  },
  configureWebpack: (config) => {
    config.externals = {
      'bootstrap-icons':'bootstrap-icons',
      echarts: "echarts",
      vue: 'Vue',
      'vue-router': 'VueRouter',
      'bootstrap':'bootstrap',
      lodash: '_',
      moment: "moment"
    }
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      return{
        plugins: [new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,//压缩文件名
          threshold: 10240,//超过10K 压缩
          deleteOriginalAssets: false,
          minRatio:0.8 // 压缩比大于0.8的文件将不会被压缩
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
    requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
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
