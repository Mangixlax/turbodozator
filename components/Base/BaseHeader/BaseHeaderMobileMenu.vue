<template>
  <div :class="$style['wrapper']">
    <transition name="mobile__menu">
      <div :class="$style['menu']" v-if="isMobileMenuOpen">
        <div :class="$style['menu__header']">
          <span @click="closeMobileMenu" :class="$style['menu__header-close']">
            <svg-icon :name="'header/close'"></svg-icon>
          </span>
        </div>
        <div :class="$style['menu__body']">
          <component
            v-for="(item, index) in data"
            v-bind:is="getItemBinds(item).is"
            v-bind="getItemBinds(item)"
            :key="index"
            :class="$style['menu__dropdown']"
            :isOpen="index === 0"
          >
            <template v-slot:icon-before>
              <svg-icon :name="`menu/${item.icon}`"></svg-icon>
            </template>
            <template v-slot:label>
              {{ item.label }}
            </template>
            <div :class="$style['menu__container']">
              <div :class="$style['menu__links']">
                <base-header-list
                  v-for="(list, index) in item.columns"
                  :key="index"
                  :list="list"
                  :class="$style['menu__column-box']"
                ></base-header-list>
              </div>
            </div>
          </component>
          <!-- <div :class="$style['menu__ad']">
            <div :class="$style['menu__ad-title']">Рекомендуем</div>
            <banner-in-menu :banner="bannerInMenu"></banner-in-menu>
          </div> -->
        </div>
        <div :class="$style['menu__footer']">
          <!-- <base-header-list
            display="row"
            :list="footerLinks"
          ></base-header-list> -->
          <base-footer-icons
            :class="$style['menu__footer-icons']"
          ></base-footer-icons>
        </div>
      </div>
    </transition>
    <transition name="mobile__menu-overlay">
      <div
        v-if="isMobileMenuOpen"
        :class="$style['menu__overlay']"
        @click="closeMobileMenu"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import { Location } from 'vue-router/types/router'
import UiMenuDropdown from '~/components/Ui/Menu/UiMenuDropdown.vue'
import UiMenuLink from '~/components/Ui/Menu/UiMenuLink.vue'
import BaseHeaderList from '~/components/Base/BaseHeader/BaseHeaderList.vue'
import BaseFooterIcons from '~/components/Base/BaseFooter/BaseFooterIcons.vue'
// import BannerInMenu from '~/components/Banners/BannerInMenu.vue'
import { getScrollbarWidth } from '~/lib/utils'

interface IItem {
  label: string
  type: string
  icon: string
  iconColor: string
  route: Location
  columns?: Array<object>
}

@Component({
  components: {
    UiMenuDropdown,
    UiMenuLink,
    BaseHeaderList,
    BaseFooterIcons,
    // BannerInMenu,
  },
})
export default class BaseHeaderMobileMenu extends Vue {
  @Prop({ type: Array, default: () => [] }) data!: Array<object>
  @Prop({ type: Object, default: () => {} }) footerLinks!: object

  @Watch('isMobileMenuOpen')
  onChangeMenuIsOpen(isOpen: boolean) {
    if (isOpen) {
      document.body.setAttribute('menu-open', '')
      document.body.style.setProperty(
        '--modal-padding',
        getScrollbarWidth() + 'px'
      )
    } else {
      document.body.removeAttribute('menu-open')
      document.body.style.setProperty('--modal-padding', '0')
    }
  }

  @Watch('$route')
  onRouteChange() {
    this.$store.commit('setMobileMenu', false)
  }

  get bannerInMenu() {
    return this.$store.getters['banners/getBannerInMenu']
  }

  get isMobileMenuOpen() {
    return this.$store.getters['isMobileMenuOpen']
  }

  getItemBinds(item: IItem) {
    if (item.type === 'link') {
      return {
        is: 'ui-menu-link',
        route: item.route,
        label: item.label,
        iconColor: item.iconColor,
      }
    } else {
      return {
        is: 'ui-menu-dropdown',
        iconColor: item.iconColor,
      }
    }
  }

  public closeMobileMenu() {
    this.$store.commit('setMobileMenu', false)
  }
}
</script>

<style lang="scss" module>
body[menu-open] {
  overflow: hidden;
}

.wrapper {
  @media (min-width: 1100px) {
    display: none;
  }
}

.menu {
  position: fixed;
  background: $color-white-100;
  width: 100vw;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  &__header {
    padding: 22px 28px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &-close {
      padding: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;

      svg {
        height: 20px;
        width: 20px;
        fill: $color-black-100;
      }
    }
  }

  &__body {
    padding: 16px;
  }

  &__dropdown {
    & + & {
      border-top: solid 1px $color-black-4;
    }
  }

  &__container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__links {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__column {
    min-width: 260px;

    & + & {
      margin-top: 32px;
    }

    &-box:not(:last-child) {
      margin-bottom: 32px;
    }

    .header__dropdown-column--row & {
      margin-bottom: 16px;
    }

    &-sort {
      @include size-h3-semi-bold;
      margin: 0;
      color: $color-black-48;
      margin-bottom: 24px;
    }
  }

  &__ad {
    display: flex;
    flex-direction: column;
    padding: 12px;

    &-title {
      @include size-body-text;
      color: $color-black-48;
      margin-bottom: 16px;
    }
  }

  &__footer {
    margin-top: auto;
    padding: 14px 28px 56px 28px;

    &-icons {
      margin-top: 42px;
    }
  }

  &__overlay {
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
  }
}
</style>
