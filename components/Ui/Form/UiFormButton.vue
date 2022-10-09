<template functional>
  <component
    :is="props.tag"
    ref="button"
    v-on="listeners"
    v-bind="data.attrs"
    :class="[
      data.staticClass,
      data.class,
      {
        [$style['button']]: true,
        [$style['button--sm']]: props.variant === 'sm',
        [$style['button--md']]: props.variant === 'md',
        [$style['button--xl']]: props.variant === 'xl',
        [$style['button--red']]: props.color === 'red',
        [$style['button--with-blink']]: props.withBlink,
        [$style['button--full-size']]: props.fullSize,
        [$style['button--disable-hover']]: props.disableHover,
        [$style['button--disable-active']]: props.disableActive,
        [$style['button--padding-left']]: $slots['icon-before'],
        [$style['button--padding-right']]: $slots['icon-after'],
      },
    ]"
    :disabled="props.disabled"
  >
    <span
      v-if="$slots['icon-before']"
      :class="[$style['icon'], $style['icon--before']]"
    >
      <slot name="icon-before" />
    </span>
      <slot />
    <span
      v-if="$slots['icon-after']"
      :class="[$style['icon'], $style['icon--after']]"
    >
      <slot name="icon-after" />
    </span>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { CreateElement, VNode } from 'vue'
import { DefaultProps, RenderContext } from 'vue/types/options'
import { Location } from 'vue-router/types/router'

@Component
export default class UiFormButton extends Vue {
  @Prop({ type: String, default: 'button' })
  tag!: string

  @Prop({ type: String, default: 'sm' })
  variant!: string

  @Prop({ type: String, default: '' })
  color!: string

  @Prop({ type: [String, Array], default: '' })
  textClasses!: string | string[]

  @Prop({ type: Boolean, default: false })
  border!: boolean

  @Prop({ type: Boolean, default: false })
  disabled!: boolean

  @Prop({ type: Boolean, default: false })
  fullSize!: boolean

  @Prop({ type: Boolean, default: false })
  withBlink!: boolean

  @Prop({ type: Boolean, default: false })
  disableHover!: boolean

  @Prop({ type: Boolean, default: false })
  disableActive!: boolean
}
</script>

<style lang="scss" module>
.button {
  display: flex;
  width: fit-content;
  align-items: center;
  cursor: pointer;
  border: none;
  justify-content: center;
  padding: 15px 20px;
  background-color: $color-blue-100;
  min-height: 42px;
  position: relative;
  transition: transform 0.25s ease-out;
  touch-action: manipulation;
  color: $color-white-100;
  text-decoration: none;
  @include size-button;
  border-radius: 30px;
  
  &--xl {
    padding: 24px 32px;
  }

  &--md {
    padding: 16px 24px
  }

  &--sm {
    padding: 8px 16px
  }

  &--red {
    background-color: $color-red-100;
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: transparent;
    border-radius: 30px;
    transition: background-color 0.25s ease;
    z-index: -1;
  }

  &:not(&--disable-hover):hover::before {
    background-color: $color-black-8;
  }

  &--info:not(&--disable-hover):hover::before {
    background-color: $color-yellow-8;
  }

  &:active:not(&--disable-active):not(:disabled) {
    transition: none;
    transform: scale(0.98);
  }

  &:active:not(&--disable-active)::before {
    background-color: $color-black-24;
  }

  &:disabled::before {
    background-color: $color-black-24;
  }

  &--info:active:not(&--disable-active)::before {
    background-color: $color-yellow-24;
  }

  &--info:disabled::before {
    background-color: $color-yellow-24;
  }

  &--full-size {
    width: 100%;
  }

  &--padding-left {
    padding: 15px 20px 15px 16px;
  }

  &--padding-right {
    padding: 15px 16px 15px 20px;
  }

  &--with-blink {
    background-color: $color-yellow-100;
    padding: 8px 23px 10px 23px;
    border-radius: 12px;
    border: none;
    display: flex;
    flex-flow: column;
    align-items: center;
    cursor: pointer;
    position: relative;
    transition: background-color 0.25s ease;

    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 72px;
      width: 72px;
      background: linear-gradient(
        113.03deg,
        rgba(255, 255, 255, 0) 44.37%,
        rgba(255, 255, 255, 0.4) 44.38%,
        rgba(255, 255, 255, 0.32) 67.31%,
        rgba(255, 255, 255, 0) 67.32%
      );
      animation-name: order-animation;
      animation-duration: 3s;
      animation-timing-function: ease;
      animation-fill-mode: forwards;
      animation-iteration-count: infinite;
    }

    span {
      position: relative;
      z-index: 2;
      white-space: nowrap;
    }
  }
}

.icon {
  height: 16px;
  width: 16px;
  position: relative;

  &--before {
    margin-right: 6px;
  }

  &--after {
    margin-left: 6px;
  }

  svg {
    height: 16px;
    width: 16px;
  }
}


@keyframes order-animation {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(400%);
  }
}
</style>
