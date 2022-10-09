<template>
  <div :class="$style['wrapper']">
    <span
      v-for="(icon, index) in icons"
      :key="index"
      :class="$style['wrapper__icon']"
    >
      <svg-icon
        :name="`footer/${icon.name}`"
        :class="$style['wrapper__icon-svg']"
      ></svg-icon>
      <a
        :href="icon.href"
        target="_blank"
        :class="$style['wrapper__icon-link']"
        :title="icon.title"
      ></a>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { IIcon } from '~/types/Base'

@Component
export default class BaseFooterIcons extends Vue {
  public icons: Array<IIcon> = [
    {
      name: 'vk',
      href: '',
      title: 'Я в Вк',
    },
    {
      name: 'google',
      href: '',
      title: 'Я в Google',
    },
    {
      name: 'telegram',
      href: '',
      title: 'Я в Telegram',
    },
    {
      name: 'whatsapp',
      href: '',
      title: 'Я в Whatsapp',
    },
    {
      name: 'discord',
      href: '',
      title: 'Я в Discord',
    },
  ]

  public normalizeIcons() {
    return this.icons.filter((icon) => icon.href !== '')
  }
}
</script>

<style lang="scss" module>
.wrapper {
  width: fit-content;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;

  &__icon {
    height: 40px;
    width: 40px;
    position: relative;

    & + & {
      margin-left: 12px;
    }

    &-svg {
      height: 40px;
      width: 40px;
      fill: $color-black-32;
    }

    &-link {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }
}
</style>
