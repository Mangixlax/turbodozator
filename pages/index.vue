<template>
  <main :class="$style['main']">
    <main-screen id="tdz" />
    <benefits id="benefits" />
    <technical id="technical" />
    <technical-table />
    <technical-description />
    <developers id="developers"/>
    <!-- <partners id="partners" /> -->
    <contacts id="contacts" />
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Component, Prop } from 'nuxt-property-decorator'
import { getSiteUrl } from '~/lib/utils'
import metaGenerator from '~/lib/meta'
import MainScreen from '~/components/MainScreen/MainScreen.vue'
import Benefits from '~/components/Benefits/Benefits.vue'
import Technical from '~/components/Technical/Technical.vue'
import TechnicalTable from '~/components/Technical/TechnicalTable.vue'
import TechnicalDescription from '~/components/Technical/TechnicalDescription.vue'
import Partners from '~/components/Partners/Partners.vue'
import Developers from '~/components/Developers/Developers.vue'
import Contacts from '~/components/Contacts/Contacts.vue'

@Component({
  components: {
    MainScreen,
    Benefits,
    Technical,
    TechnicalTable,
    TechnicalDescription,
    Developers,
    Partners,
    Contacts,
  },

  head() {
    const result: any = {
      title: `Турбодозатор | Решение нового поколения`,
      description: `Турбодозатор – представляет собой устройство, устанавливаемое на водяной магистрали, в целях обеспечения автоматического дозирования пенообразователя из ёмкости хранения в поток воды и получения раствора с определенной концентрацией.`,
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
