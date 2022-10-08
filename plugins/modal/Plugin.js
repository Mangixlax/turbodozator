import { defineApi, defineModal, defineContainer } from './PluginCore'

const _key = '$modal'
const _componentName = 'Modal'
const _dynamicContainerName = 'ModalsContainer'

/**
 * @description Support create multiple modal instance
 */
export const defineInstance = () => {
  let api = defineApi()
  return {
    [_key]: api,
    [_componentName]: defineModal(api),
    [_dynamicContainerName]: defineContainer(api),
  }
}

/**
 * @description Register modal instance globally
 */
const installModal = (Vue, options = {}) => {
  const key = options.key || _key
  const componentName = options.componentName || _componentName

  if (Vue.prototype[key]) {
    return
  }

  const { $modal, Modal, ModalsContainer } = defineInstance()

  /**
   * Modal container insert to body when the modal is called in first time
   */
  Object.defineProperty(Vue.prototype, key, {
    get: function () {
      const caller = this

      if (caller instanceof Vue) {
        const root = caller.$root

        /**
         * Insert a modal container into the body of the page if it hasn't already been inserted
         */
        if (!$modal.context.root) {
          $modal._setDynamicModalContainer(root, ModalsContainer)
        }
      }

      return $modal
    },
  })

  Vue.component(componentName, Modal)
}

/**
 * @description Vue plugin for register modal instance globally
 */
export const modalPlugin = (pluginOptions) => ({
  install(Vue, options) {
    const _options = Object.assign({}, pluginOptions, options)
    installModal(Vue, _options)
  },
})

modalPlugin.install = installModal
