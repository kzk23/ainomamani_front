export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/style.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://buefy.github.io/#/documentation
    'nuxt-buefy',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  proxy: {
    '/server/': {
      target: 'https://ainomamani-backend-20200911.wl.r.appspot.com/',
      pathRewrite: { '^/server/': '' },
    },
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  auth: {
    cookie: false,
    redirect: {
      callback: '/callback',
      logout: '/signed-out',
      home: false,
    },
    strategies: {
      local: {
        tokenType: 'JWT',
        endpoints: {
          login: {
            url: '/server/rest-auth/login/',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: '/server/rest-auth/user/',
            method: 'get',
            propertyName: '',
          },
        },
      },
      google: {
        client_id:
          '195911995633-audmil65dfr7p6c9ijf4b0llf4lmlm6g.apps.googleusercontent.com',
        response_type: 'code token',
        scope: ['email', 'profile'],
        userinfo_endpoint: '/server/rest-auth/user/',
      },
    },
  },
}
