import Vue, { PluginObject, VNodeData, Component, AsyncComponent } from 'vue'

export class ModalComponent extends Vue {
  $refs: {
    modalContainer: HTMLDivElement
  }
}

export interface DynamicModalOptions {
  /**
   * modal component
   */
  component?: string | Component | AsyncComponent
  /**
   * bind props and attrs to modal
   */
  bind?: { [key: string]: any }
  /**
   * register events to modal
   */
  on?: VNodeData['on']
  /**
   * modal component slot
   *
   * @example
   * ```js
   * {
   *   slot: {
   *     default: {
   *       component: 'RegistedComponentName'
   *       bind: {
   *         yourPropsKey: propsValue
   *       }
   *     }
   *   }
   * }
   * ```
   *
   * @example
   * ```js
   * {
   *   slot: {
   *     default: 'pure string'
   *   }
   * }
   * ```
   */
  slots?: {
    [key: string]:
      | {
      component: string | Component | AsyncComponent
      bind?: { [key: string]: any }
      on?: { [key: string]: Function | Function[] }
    }
      | string
  }
}

interface DynamicModalData extends DynamicModalOptions {
  value: boolean
  id: symbol
  params: any
}

export interface ModalProperty {
  readonly dynamicModals: DynamicModalData[]
  readonly openedModals: ModalComponent[]
  readonly modals: ModalComponent[]
  get(...names: string[]): ModalComponent[]

  show(name: string, params?: any): void
  show(modal: DynamicModalOptions, params?: any): void

  hide(...names: string[]): void
  hideAll(): void

  toggle(name: string | string[], params?: any): void
  toggle(name: string | string[], show?: boolean, params?: any): void
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $modal: ModalProperty
  }
}

export interface ModalOptions {
  key?: string
  componentName?: string
  dynamicContainerName?: string
}

declare const modalPlugin: () => PluginObject<ModalOptions>

export default modalPlugin
