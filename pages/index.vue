<template>
  <main :class="$style['main']">
    <main-screen />
    <benefits />
    <technical />
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import { Context } from "@nuxt/types";
import { Component, Prop } from "nuxt-property-decorator";
import { getSiteUrl } from '~/lib/utils'
import metaGenerator from '~/lib/meta'
import MainScreen from "~/components/MainScreen/MainScreen.vue";
import Benefits from '~/components/Benefits/Benefits.vue'
import Technical from '~/components/Technical/Technical.vue'

@Component({
  components: {
    MainScreen,
    Benefits,
    Technical,
  },

  head() {
    const result: any = {
      title: ``,
      description: ``,
      canonical: this.$route.path,
    }

    
    result.canonical = getSiteUrl(result.canonical, true)

    return {
      title: result.title,
      meta: metaGenerator(result),
      link: [
        {
          rel: 'canonical',
          href: result.canonical,
        },
      ],
    }
  },
})
export default class IndexPage extends Vue {}
</script>
<style lang="scss" module>
.main {
  width: 100%;
}
</style>
