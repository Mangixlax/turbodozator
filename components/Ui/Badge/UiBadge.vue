<template functional>
  <component
    :is="props.tag"
    v-bind="data.attrs"
    v-on="listeners"
    :class="[
      data.staticClass,
      data.class,
      {
        [$style['badge']]: true,
        [$style['badge--yellow']]: props.active,
      },
    ]"
  >
    <span
      v-if="$slots['icon-before']"
      :class="[$style['icon'], $style['icon-before']]"
    >
      <slot name="icon-before"></slot>
    </span>
    <span :class="$style['text']">
      <slot></slot>
    </span>
    <span
      v-if="$slots['icon-after']"
      :class="[$style['icon'], $style['icon-after']]"
    >
      <slot name="icon-after"></slot>
    </span>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component
export default class UiBadge extends Vue {
  @Prop({ type: String, default: "div" }) tag!: string;
  @Prop({ type: Boolean, default: false }) active!: boolean;
}
</script>

<style lang="scss" module>
.badge {
  @include size-body-tiny-text;
  border-radius: 16px;
  width: fit-content;
  padding: 8px 16px;
  color: $color-blue-100;
  border: 1px solid $color-blue-100;
  border-radius: 16px;
  white-space: nowrap;
  text-decoration: none;
  text-align: center;

  &--yellow {
    color: $color-yellow-100;
    border-color: $color-yellow-100;
  }
}

.icon {
  height: 16px;
  width: 16px;

  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
