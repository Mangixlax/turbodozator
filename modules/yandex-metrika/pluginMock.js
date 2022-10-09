class MockYandexMetrika {
  constructor({ debug = false, ...options }) {
    this.debug = debug
    if (this.debug) console.log('[nuxt-yandex-metrika] MockYandexMetrika recived options:', options)
  }

  addFileExtension() {
    if (this.debug) console.log('[nuxt-yandex-metrika] addFileExtension:', arguments)
  }

  extLink() {
    if (this.debug) console.log('[nuxt-yandex-metrika] extLink:', arguments)
  }

  file() {
    if (this.debug) console.log('[nuxt-yandex-metrika] file:', arguments)
  }

  getClientID() {
    if (this.debug) console.log('[nuxt-yandex-metrika] getClientID:', arguments)
  }

  hit() {
    if (this.debug) console.log('[nuxt-yandex-metrika] hit:', arguments)
  }

  notBounce() {
    if (this.debug) console.log('[nuxt-yandex-metrika] notBounce:', arguments)
  }

  params() {
    if (this.debug) console.log('[nuxt-yandex-metrika] params:', arguments)
  }

  reachGoal() {
    if (this.debug) console.log('[nuxt-yandex-metrika] reachGoal:', arguments)
  }

  replacePhones() {
    if (this.debug) console.log('[nuxt-yandex-metrika] replacePhones:', arguments)
  }

  setUserID() {
    if (this.debug) console.log('[nuxt-yandex-metrika] setUserID:', arguments)
  }

  userParams() {
    if (this.debug) console.log('[nuxt-yandex-metrika] userParams:', arguments)
  }
}

export default ({ app }, inject) => {
  /**
   *  Шаблонные строки см: https://ru.nuxtjs.org/api/internals-module-container#template-plugins
   */
  const options = JSON.parse('<%= JSON.stringify(options) %>')
  const { router } = app
  let navigationReady = false

  /**
   *  Подписываемся на событие инициализации навигации(router)
   */
  router.onReady(() => {
    navigationReady = true
  })

  const createYandexMetrika = () => {
    /**
     *  В dev режиме мокаем сервис Yandex.Metrika
     */
    const ymCounter = (window[`yaCounter${options.id}`] = new MockYandexMetrika(options))

    router.afterEach((to, from) => {
      if (!navigationReady) {
        // Do not duplicate hit with url
        return
      }
      ymCounter.hit(to.fullPath, {
        referer: from.fullPath,
      })
    })

    // Inject yandex metrika to nuxt for use from this.$ym
    inject('ym', ymCounter)
  }

  // Init Yandex Metrika
  createYandexMetrika()
}
