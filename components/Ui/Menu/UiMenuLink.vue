<template>
  <nuxt-link
    :to="{
      name: route.name,
      params: route.params,
    }"
    :class="{
      [$style['link']]: true,
      [$style['icon--primary']]: iconColor === 'primary',
      [$style['icon--yellow']]: iconColor === 'yellow',
      [$style['icon--black']]: iconColor === 'black',
    }"
  >
    <span
      v-if="$slots['icon-before']"
      :class="[$style['icon'], $style['icon-before']]"
    >
      <slot name="icon-before"></slot>
    </span>
    <span :class="$style['link__label']">
      {{ label }}
    </span>
  </nuxt-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'value',
    event: 'update',
  },
})
export default class UiMenuLink extends Vue {
  @Prop({ type: Object, default: () => {} }) route!: object
  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) iconColor!: string
}
</script>

<style lang="scss" module>
.link {
  display: flex;
  align-items: center;
  padding: 16px 12px 16px 24px;
  position: relative;
  text-decoration: none;

  &__label {
    text-decoration: none;
    @include size-h3-semi-bold;
    color: $color-black-100;
    margin: 0;
    margin-right: auto;

    // .icon--yellow & {
    //   color: $color-yellow-100;
    // }
  }
}

.icon {
  height: 24px;
  width: 24px;
  margin-right: 8px;

  svg {
    height: 24px;
    width: 24px;

    .icon--primary & {
      fill: $color-blue-100;
    }

    .icon--yellow & {
      fill: $color-yellow-100;
    }

    .icon--black & {
      fill: $color-black-100;
    }
  }
}
</style>
