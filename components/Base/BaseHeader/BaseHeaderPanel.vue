<template>
  <div :class="$style['wrapper']">
    <div :class="$style['wrapper__contact']">
      <span :class="[$style['wrapper__icon'], $style['wrapper__icon--mobile']]">
        <svg-icon
          name="header/phone"
          :class="$style['wrapper__icon-svg']"
        ></svg-icon>
      </span>
      <!-- <common-phone-number-render
        text-variant="dark"
        phone="8 (961) 191-11-16"
        :class="$style['wrapper__contact-phone']"
      ></common-phone-number-render> -->
    </div>
    <span :class="$style['wrapper__icon']">
      <svg-icon
        name="header/subscribe"
        :class="$style['wrapper__icon-svg']"
      ></svg-icon>
      <nuxt-link
        :to="{ name: 'index' }"
        :class="$style['wrapper__icon-link']"
      ></nuxt-link> 
    </span>
    <span :class="$style['wrapper__icon']">
      <svg-icon
        name="header/like"
        :class="$style['wrapper__icon-svg']"
      ></svg-icon>
      <nuxt-link
        :to="{ name: 'index' }"
        :class="$style['wrapper__icon-link']"
      ></nuxt-link> 
    </span>
    <span :class="$style['wrapper__icon']">
      <svg-icon
        name="header/bookmark"
        :class="$style['wrapper__icon-svg']"
      ></svg-icon>
      <nuxt-link
        :to="{ name: 'index' }"
        :class="$style['wrapper__icon-link']"
      ></nuxt-link>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
// import CommonPhoneNumberRender from "~/components/Common/CommonPhoneNumberRender.vue";

@Component({
  // components: { CommonPhoneNumberRender },
})
export default class BaseHeaderPanel extends Vue {}
</script>

<style lang="scss" module>
.wrapper {
  display: flex;
  align-items: center;
  height: 100%;

  @media (max-width: 1100px) {
    display: none;
  }

  & + & {
    margin-left: 16px;
  }

  &__contact {
    display: flex;
    align-items: center;
    height: 100%;

    &-phone {
      @media (max-width: 1200px) {
        display: none;
      }
    }
  }

  &__icon {
    height: 20px;
    width: 20px;
    margin-left: 16px;
    position: relative;
    display: none;

    &--mobile {
      @media (min-width: 1200px) {
        display: none;
      }
    }

    &-svg {
      height: 20px;
      width: 20px;
      fill: $color-black-100;
    }

    &-link {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
