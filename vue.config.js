module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/styles/variables.scss";`,
      },
    },
  },
  devServer: {
    proxy: {
      [process.env.VUE_APP_PREFIX_BOSS]: {
        target: process.env.VUE_APP_BASE_BOSS,
        changeOrigin: true,
      },
      [process.env.VUE_APP_PREFIX_FRONT]: {
        target: process.env.VUE_APP_BASE_FRONT,
        changeOrigin: true,
      },
    },
  },
}
