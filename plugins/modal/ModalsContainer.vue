<template>
  <div>
    <component
      v-for="(modal, index) in api.dynamicModals"
      :key="modal.id"
      :is="modal.component"
      v-model="modal.value"
      v-bind="modal.bind"
      v-on="modal.on"
      @closed="slice(index)"
      @before-open="(e) => beforeOpen(e, modal, index)"
      @opened="modal.opened"
    >
      <template v-for="(slot, key) in modal.slots" v-slot:[key]>
        <div v-if="isString(slot)" :key="key" v-html="slot"></div>
        <component
          v-else
          :key="key"
          :is="slot.component"
          v-bind="slot.bind"
          v-on="slot.on"
        />
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { Vue } from 'nuxt-property-decorator'
import { ComponentOptions } from 'vue/types/options'

/**
 * @TODO Find in typescript a possible for setting highlighting a methods in html code
 */
export default <ComponentOptions<Vue>>{
  methods: {
    slice(index: number) {
      this.api.dynamicModals.splice(index, 1)
      this.$nextTick(() => {
        ;(this.$root as Vue).$emit('modal:closed', this.api)
      })
    },
    beforeOpen(e: any, modal: any, index: number) {
      e.ref.params = modal.params
      this.$nextTick(() => {
        if (!modal.value) {
          this.slice(index)
          modal.reject('show')
        }
        ;(this.$root as Vue).$emit('modal:opened', this.api)
      })
    },
    isString(val: any) {
      return typeof val === 'string'
    },
  },
}
</script>
