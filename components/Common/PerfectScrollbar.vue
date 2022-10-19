<template>
  <div
    class="ps-container"
    :is="tag"
    @ps-scroll-y="scrollHandle"
    @ps-scroll-x="scrollHandle"
    @ps-scroll-up="scrollHandle"
    @ps-scroll-down="scrollHandle"
    @ps-scroll-left="scrollHandle"
    @ps-scroll-right="scrollHandle"
    @ps-y-reach-start="scrollHandle"
    @ps-y-reach-end="scrollHandle"
    @ps-x-reach-start="scrollHandle"
    @ps-x-reach-end="scrollHandle"
  >
    <slot></slot>
  </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'

export default {
  name: 'PerfectScrollbar',
  props: {
    settings: {
      default: null,
    },
    switcher: {
      type: Boolean,
      default: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      ps: null,
    }
  },
  methods: {
    scrollHandle(evt) {
      this.$emit(evt.type, evt)
    },
    update() {
      if (this.ps) {
        this.ps.update()
      }
    },
    __init() {
      if (this.switcher) {
        if (!this._ps_inited) {
          this._ps_inited = true
          this.ps = new PerfectScrollbar(this.$el, this.settings)
        } else {
          this.ps.update()
        }
      }
    },
    __uninit() {
      if (this.ps) {
        this.ps.destroy()
        this.ps = null
        this._ps_inited = false
      }
    },
  },
  watch: {
    switcher(val) {
      if (val && !this._ps_inited) {
        this.__init()
      }
      if (!val && this._ps_inited) {
        this.__uninit()
      }
    },
    settings: {
      deep: true,
      handler() {
        this.__uninit()
        this.__init()
      },
    },
    $route() {
      this.update()
    },
  },
  mounted() {
    // for support ssr
    if (!this.$isServer) {
      this.__init()
    }
  },
  updated() {
    this.$nextTick(this.update)
  },
  activated() {
    this.__init()
  },
  deactivated() {
    this.__uninit()
  },
  beforeDestroy() {
    this.__uninit()
  },
}
</script>

<style lang="scss">
.ps {
  overflow: hidden !important;
  overflow-anchor: none;
  -ms-overflow-style: none;
  touch-action: auto;
  -ms-touch-action: auto;
  position: relative;
}

.ps__rail-x {
  display: block;
  height: 15px;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}

.ps__rail-y {
  display: block;
  width: 15px;
  right: 5px;
  position: absolute;
  pointer-events: none;
}

.ps__thumb-x {
  background: $color-black-100;
  border-radius: 2px;
  height: 6px;
  bottom: 2px;
  position: absolute;
}

.ps__thumb-y {
  width: 2px;
  right: 2px;
  position: absolute;
  background: $color-black-100;
  border-radius: 2px;
}

@supports (-ms-overflow-style: none) {
  .ps {
    overflow: auto !important;
  }
}

@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  .ps {
    overflow: auto !important;
  }
}

.ps-container {
  position: relative;
}
</style>
