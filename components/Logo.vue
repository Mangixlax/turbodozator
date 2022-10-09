<template>
  <nuxt-link
    :to="{ name: 'index' }"
    :class="{
      [$style['link']]: true,
      [$style['link-black']]: variant === 'black',
    }"
    title="LogoLion"
  >
    <svg-icon name="logo" :class="$style['link-logo']"></svg-icon>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "nuxt-property-decorator";

@Component
export default class Logo extends Vue {
  @Prop({ type: String, default: "" }) variant!: string;
}
</script>

<style lang="scss" module>
.link {
  display: flex;
  text-decoration: none;
  align-items: center;
  height: 100%;

  &-logo {
    width: 60px;
    height: 70px;
    fill: $color-yellow-100;
    margin-right: 8px;

    @media (max-width: 800px) {
      margin-right: 0;
    }

    .link-black & {
      fill: $color-black-100;
    }
  }
}
</style>
