<template>
  <div  id="tdz">
    <base-header is-main-page/>
    <nuxt />
    <!--    <lazy-hydrate when-visible>-->
    <!--      <base-seo-text />-->
    <!--    </lazy-hydrate>-->
    <base-footer />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import BaseHeader from '~/components/Base/BaseHeader/BaseHeader.vue'
import BaseFooter from '~/components/Base/BaseFooter/BaseFooter.vue'

@Component({
  components: {
    BaseHeader,
    BaseFooter,
  },
})
export default class DefaultLayout extends Vue {}
</script>

<style lang="scss" module>
</style>
