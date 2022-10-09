<template functional>
  <component
    v-bind="data.attrs"
    :is="props.tag"
    :class="{
      [$style['group']]: true,
      [$style['group--vertical']]: props.variant == 'vertical',
      [$style['group--horizontal']]: props.variant == 'horizontal',
    }"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class UiFormGroup extends Vue {
  @Prop({ type: String, default: "div" }) tag!: string;
  @Prop({ type: String, default: "vertical" }) variant!: string;
}
</script>

<style lang="scss" module>
.group {
  display: flex;
  
  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
    align-items: center;
  }
}

.group + .group {
  margin-top: 4px;
}
</style>
