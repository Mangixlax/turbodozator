import Vue from 'vue'
import StickySidebar from 'sticky-sidebar'

// acccess StickySidebar Instance via vnode.elm._stickySidebar
const NS = '_stickySidebar'
const DEFAULTS = {
  topSpacing: 0,
  bottomSpacing: 0,
  containerSelector: false,
  innerWrapperSelector: '[data-v-sticky-inner]',
  resizeSensor: true,
  stickyClass: 'is-affixed',
  minWidth: 0,
}

const EVENT_NAMES_MAP = {
  'affix.top.stickySidebar': 'affix-top',
  'affixed.top.stickySidebar': 'affixed-top',
  'affix.bottom.stickySidebar': 'affix-bottom',
  'affixed.bottom.stickySidebar': 'affixed-bottom',
  'affix.container-bottom.stickySidebar': 'affix-container-bottom',
  'affixed.container-bottom.stickySidebar': 'affixed-container-bottom',
  'affix.unbottom.stickySidebar': 'affix-unbottom',
  'affixed.unbottom.stickySidebar': 'affixed-unbottom',
  'affix.static.stickySidebar': 'affix-static',
  'affixed.static.stickySidebar': 'affixed-static',
}

/**
 * Emit
 *
 * @desc Mimic vnode.context.$emit(event, data) https://stackoverflow.com/a/40720172/2801012
 * @param {Vnode} vnode
 * @param {String} name
 * @param {Object} data - Any data accessible at v-on:event-name payload
 */
const emit = (vnode, name, data) => {
  const handlers =
    (vnode.data && vnode.data.on) || (vnode.componentOptions && vnode.componentOptions.listeners)

  if (handlers && handlers[name]) {
    handlers[name].fns(data)
  }
}

/**
 * Handling eventlistener
 *
 * @param {Event} e — native event object
 * @param {VNode} vnode - target vnode
 * @returns {Function} emit
 */
const handleEvents = function (e, vnode) {
  const humanizedEventName = EVENT_NAMES_MAP[e.type]
  emit(vnode, humanizedEventName, {
    evtName: humanizedEventName,
    vnode: vnode,
  })
}

/**
 * handleEventsReference
 *
 * @desc a reference where handleEvents will be assigned to allow add and remove eventListeners
 */
let handleEventsReference

/**
 * mergeOptions with type verification and fallback to current options
 * @param {*} oldOpts
 * @param {*} newOpts
 */
const mergeOptions = (oldOpts, newOpts) => {
  if (typeof newOpts === 'undefined' || typeof newOpts === 'object') {
    return {
      ...oldOpts,
      ...newOpts,
    }
  } else {
    console.warn("v-sticky binding must be an object, 'fallbacking' to previous option set")
    return oldOpts
  }
}

Vue.directive('sticky', {
  inserted(el, binding, vnode) {
    const opts = mergeOptions(DEFAULTS, binding.value)
    vnode.context.$nextTick(() => {
      el[NS] = new StickySidebar(el, opts)

      // vnode.context.$root.$on('update-sticky', () => {
      //   el[NS].updateSticky()
      // })

      handleEventsReference = function (e) {
        handleEvents(e, vnode)
      }

      Object.keys(EVENT_NAMES_MAP).map((evtName) =>
        el.addEventListener(evtName, handleEventsReference),
      )
    })
  },
  unbind(el, binding, vnode) {
    if (el[NS]) {
      // vnode.context.$root.$off('update-sticky')
      el[NS].destroy()
      el[NS] = undefined
      Object.keys(EVENT_NAMES_MAP).map((evtName) =>
        el.removeEventListener(evtName, handleEventsReference),
      )
    }
  },
  update(el, binding, vnode) {
    if (binding.value === binding.oldValue) return
    el[NS].options = mergeOptions(el[NS].options, binding.value)
    el[NS].updateSticky()
  },
  componentUpdated(el, binding, vnode) {
    if (el[NS]) {
      el[NS].updateSticky()
    }
  },
})
