<template>
  <div
    v-if="ssr || visible"
    v-show="!ssr || visible"
    :style="bindStyle"
    :class="[
      $style['modal'],
      $style['modal--inset'],
      attach === false ? $style['modal--fixed'] : $style['modal--absolute'],
      { [$style['modal--prevent-none']]: preventClick },
    ]"
    @keydown.esc="onEsc"
  >
    <transition
      ref="modalOverlayTransition"
      :enter-class="$style['modal-enter']"
      :enter-active-class="$style['modal-enter-active']"
      :leave-active-class="$style['modal-leave-active']"
      :leave-to-class="$style['modal-leave-to']"
      @before-enter="beforeOverlayEnter"
      @after-enter="afterOverlayEnter"
      @before-leave="beforeOverlayLeave"
      @after-leave="afterOverlayLeave"
    >
      <div
        v-show="!hideOverlay && visibility.overlay"
        :class="[
          $style['modal__overlay'],
          $style['modal--overlay'],
          $style['modal--absolute'],
          $style['modal--inset'],
          overlayClass,
        ]"
        :style="overlayStyle"
      ></div>
    </transition>
    <transition
      ref="modalTransition"
      :enter-class="$style['modal-enter']"
      :enter-active-class="$style['modal-enter-active']"
      :leave-active-class="$style['modal-leave-active']"
      :leave-to-class="$style['modal-leave-to']"
      @before-enter="beforeModalEnter"
      @after-enter="afterModalEnter"
      @before-leave="beforeModalLeave"
      @after-leave="afterModalLeave"
    >
      <div
        v-show="visibility.modal"
        ref="modalContainer"
        :class="[
          $style['modal__container'],
          $style['modal--absolute'],
          $style['modal--inset'],
          $style['modal--outline-none'],
          classes,
        ]"
        :style="styles"
        :aria-expanded="visibility.modal.toString()"
        role="dialog"
        aria-modal="true"
        tabindex="-1"
        @mouseup.self="onMouseupContainer"
        @mousedown.self="onMousedown"
      >
        <div
          ref="modalContent"
          :class="[
            $style['modal__content'],
            contentClass,
            { [$style['modal--prevent-auto']]: preventClick },
          ]"
          :style="bindContentStyle"
          @mousedown="onMousedown(null)"
        >
          <slot :params="params" :close="() => $emit('input', false)" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import FocusTrap from './utils/focusTrap.js'
import { disableBodyScroll, enableBodyScroll } from './utils/bodyScrollLock.js'

const noop = () => {}

const TransitionState = {
  Enter: 'enter',
  Entering: 'entering',
  Leave: 'leave',
  Leaving: 'leaving',
}

function validateAttachTarget(val) {
  const type = typeof val

  if (type === 'boolean' || type === 'string') return true

  return val.nodeType === Node.ELEMENT_NODE
}

const CLASS_PROP = {
  type: [String, Object, Array],
  default: '',
}
const STYLE_PROP = {
  type: [Object, Array],
  default: () => ({}),
}

export default {
  props: {
    name: { type: String, default: null },
    value: { type: Boolean, default: false },
    ssr: { type: Boolean, default: true },
    classes: CLASS_PROP,
    overlayClass: CLASS_PROP,
    contentClass: CLASS_PROP,
    styles: STYLE_PROP,
    overlayStyle: STYLE_PROP,
    contentStyle: STYLE_PROP,
    lockScroll: { type: Boolean, default: true },
    hideOverlay: { type: Boolean, default: false },
    clickToClose: { type: Boolean, default: true },
    escToClose: { type: Boolean, default: true },
    preventClick: { type: Boolean, default: false },
    attach: { type: null, default: false, validator: validateAttachTarget },
    zIndexAuto: { type: Boolean, default: true },
    zIndexBase: { type: [String, Number], default: 1000 },
    zIndex: { type: [Boolean, String, Number], default: false },
    focusRetain: { type: Boolean, default: true },
    focusTrap: { type: Boolean, default: true },
    fitParent: { type: Boolean, default: true },
    keepChangedStyle: { type: Boolean, default: false },
    minWidth: { type: Number, default: 0 },
    minHeight: { type: Number, default: 0 },
    maxWidth: { type: Number, default: Infinity },
    maxHeight: { type: Number, default: Infinity },
  },
  data() {
    return {
      modalStackIndex: null,
      visible: false,
      visibility: {
        modal: false,
        overlay: false,
      },
      overlayTransitionState: null,
      modalTransitionState: null,
      stopEvent: false,
      params: {},
      resolveToggle: noop,
      rejectToggle: noop,
      state: null,
      lastMousedownEl: null,
    }
  },
  computed: {
    calculateZIndex() {
      if (this.zIndex === false) {
        if (this.zIndexAuto) {
          return +this.zIndexBase + 2 * (this.modalStackIndex || 0)
        } else {
          return false
        }
      } else {
        return this.zIndex
      }
    },
    bindStyle() {
      return {
        ...(this.calculateZIndex !== false && { zIndex: this.calculateZIndex }),
      }
    },
    bindContentStyle() {
      let style = []
      Array.isArray(this.contentStyle)
        ? style.push(...this.contentStyle)
        : style.push(this.contentStyle)
      return style
    },
  },
  watch: {
    value(value) {
      if (this.stopEvent) {
        this.stopEvent = false
        return
      }
      this.mounted()
      if (!value) {
        if (this.emitEvent('before-close', true)) {
          this.rejectToggle('hide')
          return
        }
        this.close()
      }
    },
    lockScroll: 'handleLockScroll',
    hideOverlay(value) {
      if (this.value && !value) {
        this.visibility.overlay = true
      }
    },
    attach: 'mounted',
  },
  created() {
    this.api.modals.push(this)
  },
  mounted() {
    this.$focusTrap = new FocusTrap()
    this.mounted()
  },
  beforeDestroy() {
    this.close()
    this.lockScroll &&
      this.$refs.modalContainer &&
      enableBodyScroll(this.$refs.modalContainer)
    this?.$el?.remove()

    let index = this.api.modals.findIndex((vm) => vm === this)
    this.api.modals.splice(index, 1)
  },
  methods: {
    mounted() {
      this.$focusTrap = new FocusTrap()
      if (this.value) {
        if (this.emitEvent('before-open', false)) {
          this.rejectToggle('show')
          return
        }
        let target = this.getAttachElement()
        if (target || this.attach === false) {
          this.attach !== false && target.appendChild(this.$el)

          let index = this.api.openedModals.findIndex((vm) => vm === this)
          if (index !== -1) {
            // if this is already exist in modalStack, delete it
            this.api.openedModals.splice(index, 1)
          }

          this.api.openedModals.push(this)

          this.modalStackIndex = this.api.openedModals.length - 1

          this.handleLockScroll()
          this.api.openedModals
            .filter((vm) => vm !== this)
            .forEach((vm, index) => {
              if (vm.getAttachElement() === target) {
                // if vm and this have the same attach element
                vm.modalStackIndex = index
                vm.visibility.overlay = false
              }
            })

          this.visible = true
          this.$nextTick(() => {
            this.startTransitionEnter()
          })
        } else if (target !== false) {
          console.warn('Unable to locate target '.concat(this.attach))
        }
      }
    },
    close() {
      let index = this.api.openedModals.findIndex((vm) => vm === this)
      if (index !== -1) {
        // remove this in modalStack
        this.api.openedModals.splice(index, 1)
      }
      if (this.api.openedModals.length > 0) {
        // If there are still nested modals opened
        const $_vm = this.api.openedModals[this.api.openedModals.length - 1]
        if ($_vm.focusRetain || $_vm.focusTrap) {
          $_vm.$refs.modalContainer.focus()
        }
        !$_vm.hideOverlay && ($_vm.visibility.overlay = true)
      }
      this.state = null

      this.startTransitionLeave()
    },
    startTransitionEnter() {
      this.visibility.overlay = true
      this.visibility.modal = true
    },
    startTransitionLeave() {
      this.visibility.overlay = false
      this.visibility.modal = false
    },
    handleLockScroll() {
      if (this.value) {
        this.$nextTick(() => {
          if (this.lockScroll) {
            disableBodyScroll(this.$refs.modalContainer, {
              reserveScrollBarGap: true,
            })
          } else {
            enableBodyScroll(this.$refs.modalContainer)
          }
        })
      }
    },
    getAttachElement() {
      let target
      if (this.attach === false) {
        target = false
      } else if (typeof this.attach === 'string') {
        // CSS selector
        if (window) {
          target = window.document.querySelector(this.attach)
        } else {
          target = false
        }
      } else {
        // DOM Element
        target = this.attach
      }
      return target
    },
    beforeOverlayEnter() {
      this.overlayTransitionState = TransitionState.Entering
    },
    afterOverlayEnter() {
      this.overlayTransitionState = TransitionState.Enter
    },
    beforeOverlayLeave() {
      this.overlayTransitionState = TransitionState.Leaving
    },
    afterOverlayLeave() {
      this.overlayTransitionState = TransitionState.Leave
    },
    beforeModalEnter() {
      this.modalTransitionState = TransitionState.Entering
    },
    afterModalEnter() {
      this.modalTransitionState = TransitionState.Enter
      if (this.focusRetain || this.focusTrap) {
        this.$refs.modalContainer.focus()
      }
      this.focusTrap && this.$focusTrap.enable(this.$refs.modalContainer)

      this.$emit('opened', this.createModalEvent({ type: 'opened' }))
      this.resolveToggle('show')
    },
    beforeModalLeave() {
      this.modalTransitionState = TransitionState.Leaving

      if (this.$focusTrap.enabled()) {
        this.$focusTrap.disable()
      }
    },
    afterModalLeave() {
      this.modalTransitionState = TransitionState.Leave
      this.modalStackIndex = null
      this.lockScroll && enableBodyScroll(this.$refs.modalContainer)

      let stopEvent = false
      const event = this.createModalEvent({
        type: 'closed',
        stop() {
          stopEvent = true
        },
      })
      this.$emit('closed', event)
      this.resolveToggle('hide')
      if (stopEvent) return
      this.params = {}
    },
    onMousedown(e) {
      this.lastMousedownEl = e?.target
    },
    onMouseupContainer() {
      // skip when the lastMousedownEl didn't equal $refs.modalContainer
      if (this.lastMousedownEl !== this.$refs.modalContainer) return
      this.$emit(
        'click-outside',
        this.createModalEvent({ type: 'click-outside' })
      )
      this.clickToClose && this.$emit('input', false)
    },
    onEsc() {
      if (this.visible && this.escToClose) {
        this.$emit('input', false)
      }
    },
    createModalEvent(eventProps = {}) {
      return {
        ref: this,
        ...eventProps,
      }
    },
    emitEvent(eventType, value) {
      let stopEvent = false
      const event = this.createModalEvent({
        type: eventType,
        stop() {
          stopEvent = true
        },
      })
      this.$emit(eventType, event)
      if (stopEvent) {
        this.stopEvent = true
        this.$emit('input', value)
        return true
      }
      return false
    },
    emitState(e, state, action) {
      this.state = `${state}:${action}`
      this.$emit(this.state, e)
    },
    toggle(show, params) {
      return new Promise((resolve, reject) => {
        this.resolveToggle = (res) => {
          resolve(res)
          this.resolveToggle = noop
        }
        this.rejectToggle = (err) => {
          reject(err)
          this.rejectToggle = noop
        }
        const value = typeof show === 'boolean' ? show : !this.value
        if (value && arguments.length === 2) {
          this.params = params
        }
        this.$emit('input', value)
      })
    },
  },
}
</script>

<style lang="scss" module>
.modal {
  &--fixed {
    position: fixed;
  }

  &--absolute {
    position: absolute;
  }

  &--inset {
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &--overlay {
    background-color: rgba(0, 0, 0, 0.24);
  }

  &--prevent-none {
    pointer-events: none;
  }

  &--prevent-auto {
    pointer-events: auto;
  }

  &--outline-none:focus {
    outline: none;
  }

  &-enter-active,
  &-leave-active {
    transition: opacity 0.2s;
  }

  &-enter,
  &-leave-to {
    opacity: 0;
  }

  &--touch-none {
    touch-action: none;
  }
  
  &--select-none {
    user-select: none;
  }
}
</style>
