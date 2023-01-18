const metaDefault = {
  title: {
    name: 'title',
    content: '',
  },
  description: {
    name: 'description',
    content: '',
  },
  keywords: {
    name: 'keywords',
    content: '',
  },

  og_title: {
    property: 'og:title',
    content: '',
    preset: 'title',
  },
  og_description: {
    property: 'og:description',
    content: '',
    preset: 'description',
  },
  og_type: {
    property: 'og:type',
    content: 'website',
  },
  og_site_name: {
    property: 'og:site_name',
    content: 'Turbodozator',
  },
  og_url: {
    property: 'og:url',
    content: '',
  },
  og_locale: {
    property: 'og:locale',
    content: '',
  },
  og_image: {
    property: 'og:image',
    content: '',
  },
  og_image_height: {
    property: 'og:image:height',
    content: '',
  },
  og_image_width: {
    property: 'og:image:width',
    content: '',
  },

  twitter_title: {
    name: 'twitter:title',
    content: '',
    preset: 'og:title',
  },
  twitter_description: {
    name: 'twitter:description',
    content: '',
    preset: 'og:description',
  },
  twitter_card: {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  twitter_image_src: {
    name: 'twitter:image:src',
    content: '',
    preset: 'og:image',
  },
  twitter_url: {
    name: 'twitter:url',
    content: '',
  },
  twitter_domain: {
    name: 'twitter:domain',
    content: 'turbodozator.ru',
  },
  twitter_site: {
    name: 'twitter:site',
    content: '@turbodozator.ru',
  },
  twitter_creator: {
    name: 'twitter:creator',
    content: '@turbodozator.ru',
  },

  robots: {
    name: 'robots',
    content: 'all',
  },
}

export const metaGenerator = (newMetaObjects = {}) => {
  const resultMeta = []

  if (newMetaObjects === null) return []

  Object.keys(metaDefault).forEach((key) => {
    const { name, property, content, preset } = metaDefault[key]

    const newMetaObject = {
      hid: key,
    }

    name && (newMetaObject.name = name)
    property && (newMetaObject.property = property)

    if (newMetaObjects[key]) {
      newMetaObject.content = newMetaObjects[key]
    } else if (preset) {
      newMetaObject.content = newMetaObjects[preset]
    } else {
      newMetaObject.content = content
    }

    // if (typeof newMetaObject.content === 'string') {
    //   newMetaObject.content = newMetaObject.content
    // }

    newMetaObject.content && resultMeta.push(newMetaObject)
  })
  return resultMeta
}

export default metaGenerator
