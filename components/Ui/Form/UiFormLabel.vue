<template functional>
  <component
    v-on="listeners"
    :is="props.tag"
    v-bind="data.attrs"
    :class="[
      data.staticClass,
      data.class,
      {
        [$style['label']]: true,
        [$style['label--with-margin']]: props.withMargin,
      },
    ]"
  >
    <slot></slot>
    <span :class="$style['label--required']" v-if="props.required"> * </span>
  </component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class UiFormLabel extends Vue {
  @Prop({ type: String, default: "label" }) tag!: string;
  @Prop({ type: Boolean, default: false }) required!: boolean;
  @Prop({ type: Boolean, default: true }) withMargin!: boolean;
}
</script>

<style lang="scss" module>
.label {
  @include size-h3-regular;
  display: block;
  color: $color-black-100;

  &--with-margin {
    margin-bottom: 8px;
  }

  &--required {
    color: red;
  }
}
</style>
