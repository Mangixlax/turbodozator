<template>
  <header
    :class="{
      [$style['header']]: true,
      [$style['mobile-open']]: mobileMenuIsOpen,
      [$style['border-bottom']]: isMainPage,
    }"
    :style="{ '--scrollbar-width': `${scrollbarWidth}px` }"
  >
    <div :class="$style['header__container']">
      <div :class="$style['header__container-inner']">
        <logo :class="$style['header__container-logo']"></logo>
        <nav :class="$style['header__navigation']">
          <ul :class="$style['header__navigation-list']">
            <base-header-nav-item
              v-for="(navItem, index) in headerMenu"
              :key="`header-nav-item-${index}`"
              :item="navItem"
              @isShowDropdown="onShowDropdown"
            >
            </base-header-nav-item>
          </ul>
        </nav>
        <div :class="$style['-devider']"></div>
        <div
          :class="$style['header__container-burger']"
          @click="openMobileMenu"
        >
          <svg-icon
            :name="mobileMenuIsOpen ? 'header/close' : 'header/burger'"
            :class="$style['header__container-burger-svg']"
          ></svg-icon>
        </div>
        <base-header-panel
          :class="$style['header__container-panel']"
        ></base-header-panel>
      </div>
    </div>
    <base-header-mobile-menu
      :data="headerMobileMenu"
      :footer-links="headerDropdownFooterLinks"
      :class="$style['header__mobile']"
    ></base-header-mobile-menu>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '~/components/Logo.vue'
import BaseHeaderList from '~/components/Base/BaseHeader/BaseHeaderList.vue'
import BaseHeaderPanel from '~/components/Base/BaseHeader/BaseHeaderPanel.vue'
import BaseFooterIcons from '~/components/Base/BaseFooter/BaseFooterIcons.vue'
import BaseHeaderMobileMenu from '~/components/Base/BaseHeader/BaseHeaderMobileMenu.vue'
import BaseHeaderNavItem from '~/components/Base/BaseHeader/BaseHeaderNavItem.vue'
import {
  IHeaderFooterLink,
  IHeaderMenuItem,
  IHeaderMobileMenuItem,
} from '~/types/Base'

@Component({
  components: {
    Logo,
    BaseHeaderList,
    BaseFooterIcons,
    BaseHeaderPanel,
    BaseHeaderMobileMenu,
    BaseHeaderNavItem,
  },
})
export default class BaseHeader extends Vue {
  public isShowOverlay: boolean = false
  public dropdownIndex: number | null = null
  public mobileMenuIsOpen: boolean = false
  public scrollbarWidth: number = 15

  get isMainPage(): boolean {
    return (
      this.$route.name === 'index' || this.$route.name === 'novostroyki-complex'
    )
  }

  public headerDropdownFooterLinks: any = {
    links: [
      {
        label: 'Реклама на сайте',
        route: { name: 'ad' },
      },
    ],
  }

  public headerMenu: Array<IHeaderMenuItem> = [
    {
      label: 'ТДЗ',
      route: { name: 'index' },
    },
    {
      label: 'Преимущества',
      route: { name: 'index', hash: '#benefits' },
    },
    {
      label: 'Тех. характеристики',
      route: { name: 'index', hash: '#technical' },
    },
    {
      label: 'Партнеры',
      route: { name: 'index', hash: '#partners' },
    },
    {
      label: 'Контакты',
      route: { name: 'index', hash: '#contacts' },
    },
  ]

  public headerMobileMenu: Array<IHeaderMobileMenuItem> = [
    {
      label: 'ТДЗ',
      type: 'link',
      icon: 'about',
      iconColor: 'yellow',
      route: { name: 'index', hash: '' },
    },
    {
      label: 'Преимущества',
      type: 'link',
      icon: 'about',
      iconColor: 'yellow',
      route: { name: 'index', hash: '#benefits' },
    },
    {
      label: 'Тех. характеристики',
      type: 'link',
      icon: 'about',
      iconColor: 'yellow',
      route: { name: 'index', hash: '#technical' },
    },
    {
      label: 'Партнеры',
      type: 'link',
      icon: 'contacts',
      iconColor: 'yellow',
      route: { name: 'index', hash: '#partners' },
    },

    {
      label: 'Контакты',
      type: 'link',
      icon: 'contacts',
      iconColor: 'yellow',
      route: { name: 'index', hash: '#contacts' },
    },
  ]

  public openMobileMenu() {
    this.$store.commit('setMobileMenu', true)
  }

  get isMobileMenuOpen() {
    return this.$store.getters['isMobileMenuOpen']
  }

  get bannerInMenu() {
    return this.$store.getters['banners/getBannerInMenu']
  }

  public onShowDropdown(value: boolean = false) {
    this.isShowOverlay = value
  }

  public calculateScrollbarWidth() {
    this.scrollbarWidth =
      window.innerWidth - document.scrollingElement!.clientWidth
  }

  mounted() {
    window.addEventListener('resize', this.calculateScrollbarWidth)
    this.calculateScrollbarWidth()
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.calculateScrollbarWidth)
  }
}
</script>

<style lang="scss" module>
.header {
  width: 100%;
  position: sticky;
  top: 0;
  height: 90px;
  z-index: 10;
  background: $color-black-100;

  &__container {
    position: relative;
    z-index: 6;
    height: 100%;
    width: 100%;
    padding: 0 20px;
    max-width: 1200px;
    margin: 0 auto;

    &-inner {
      display: flex;
      align-items: center;
      margin: 0 auto;
      height: 100%;
    }

    &-burger {
      display: flex;
      align-items: center;
      margin-left: auto;
      cursor: pointer;

      @media (min-width: 1100px) {
        display: none;
      }

      &-svg {
        height: 20px;
        width: 20px;
        fill: $color-white-100;
      }
    }

    &-panel {
      margin-left: auto;
      height: 100%;
    }

    &-logo {
      margin-right: 8px;
    }
   
  }

  &__navigation {
    display: flex;
    align-items: center;

    @media (max-width: 1100px) {
      display: none;
    }

    &-list {
      display: flex;
      margin: 0;
      padding: 0;
      list-style: none;
      height: 100%;
    }

    &-item {
      display: inline-block;
    }

    &-logo {
      padding: 0 24px;
    }

    &-link {
      @include size-h3-semi-bold;
      text-decoration: none;
      color: $color-black-100;
      margin: 0 12px 0 0;
      display: block;
    }
  }
}
</style>
