import type { UserConfigExport } from "@tarojs/cli";
export default {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {},
  logger: {
    quiet: false,
    stats: true
  },
  mini: {},
  // 小程序端配置
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    }
  },
  h5: {}
} satisfies UserConfigExport
