<template>
  <div :class="$style['back-button']" @click="$router.go(-1)">
    <svg-icon name='back-arrow' :class="$style['back-button__svg']"/>
    Назад
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "nuxt-property-decorator";

@Component
export default class Logo extends Vue {
}
</script>

<style lang="scss" module>
.back-button {
  display: flex;
  text-decoration: none;
  align-items: center;
  height: 100%;
  color: $color-black-40;
  @include size-h3-regular;
  cursor: pointer;
  
  &__svg {
    height: 30px;
    width: 30px;
    margin-right: 6px;
  }
}
</style>
