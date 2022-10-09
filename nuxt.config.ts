const isDev = process.env.NODE_ENV === 'development'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  ssr: false,
  
  target: "static",

  server: {
    host: process.env.HOST || "0.0.0.0",
    port: process.env.PORT || 3000,
  },

  head: {
    title: "turbodozator",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossorigin: true,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;300;400;500;600;700;800&display=swap",
      },
    ],
  },

  env: {
    API_URL: process.env.API_URL,
    SITE_URL: process.env.SITE_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/scss/theme.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~plugins/axios",
    "~plugins/vuelidate.js",
    { src: "~plugins/modal/index.ts", mode: "client" },
    { src: "~directives/vue-sticky-directive.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/style-resources",
    '@nuxtjs/pwa',
  ],

  styleResources: {
    scss: ["~/scss/_mixins.scss", "~/scss/_colors.scss"],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "@nuxt/image",
    "@nuxtjs/svg-sprite",
    "@nuxtjs/dayjs",
    '~modules/yandex-metrika/index.js',
  ],

  yandexMetrika: {
    id: '90602556',
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
    debug: isDev,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
      name: 'Турбодозатор',
      short_name: 'Турбодозатор',
      description: '',
      theme_color: '#BD1E2D',
      start_url: '/',
      display: 'browser',
      background_color: '#FFF',
    },
    
    workbox: false,
    icon: {
      source: 'static/icon.png',
      filename: 'icon.png',
      sizes: [16, 32, 64, 120, 144, 152, 192, 384, 512],
    },
  },

  image: {
    dir: "assets/images",
    domains: ['localhost', process.env.SITE_URL],
    alias: {
      s1: process.env.SITE_URL,
    },
  },

  dayjs: {
    locales: ["ru"],
    defaultLocale: "ru",
    defaultTimeZone: "Europe/Moscow",
    plugins: ["utc", "timezone"],
  },

  router: {
    base: '/turbodozator/',
    scrollBehavior(to: any, from: any, savedPosition: any) {
      if (to.hash) {
        return window.scrollTo({
          top: document.querySelector(to.hash).offsetTop - 20,
          behavior: "smooth",
        });
      }
    },
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
