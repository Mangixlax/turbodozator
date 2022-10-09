export default ({ app: { router }, store }, inject) => {
  let YandexMetrika = {
    // eslint-disable-next-line no-undef
    getClientID: () => {},
    // eslint-disable-next-line no-undef
    reachGoal: () => {},
    // eslint-disable-next-line no-undef
    hit: () => {},
  };

  if (!store.state.isBot) {
    const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

    /**
     *  Если явно не передали id метрики, то смотрим в env
     */
    moduleOptions.id = moduleOptions.id || process.env.YM_ID;

    /**
     *  Если id метрики нет, заменяем на XXXXXXXX и выводим в консоль предупреждение
     */
    if (!moduleOptions.id) {
      moduleOptions.id = 'XXXXXXXX';
      console.warn('[nuxt-yandex-metrika] Yandex.Metrika counter id not set');
    }

    /* eslint-disable */
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", '<%= options.metrikaUrl %>', "ym")
    /* eslint-enable */

    ym(<%= options.id %>, "init", JSON.parse('<%= JSON.stringify(options) %>'))

    ym(<%= options.id %>, "getClientID", function (clientID) {
      ym(<%= options.id %>, "userParams", {
        ip: store.state.user_ip,
        с_userid: clientID,
      })
    })

    YandexMetrika = {
      // eslint-disable-next-line no-undef
      getClientID: (callback) => ym(moduleOptions.id, 'getClientID', (clientID) => callback(clientID)),
      // eslint-disable-next-line no-undef
      reachGoal: (targetName = '', params = {}) => ym(moduleOptions.id, 'reachGoal', targetName, params),
      // eslint-disable-next-line no-undef
      hit: (url = '', options = {}) => ym(moduleOptions.id, 'hit', url, options),
    };

    router.afterEach((to, from) => {
      YandexMetrika.hit(to.fullPath, {
        referer: from.fullPath,
      })
    })
  }

  /**
   *  Инжектим ym в nuxt для доступа через this.$ym
   */
  inject('ym', YandexMetrika)
}
