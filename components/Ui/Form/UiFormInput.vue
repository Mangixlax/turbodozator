<template>
  <div :class="$style['input']">
    <input
      v-bind="$attrs"
      :value="value"
      :is="tag"
      :class="{ [$style['input__instance']]: true }"
      @input="onInput($event.target.value)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({
  model: {
    prop: 'value',
    event: 'input',
  },
})
export default class UiFormInput extends Vue {
  @Prop({ type: String, default: '' }) value!: string
  @Prop({ type: String, default: 'input' }) tag!: string

  public onInput(value: string) {
    this.$emit('input', value)
  }
}
</script>

<style lang="scss" module>
.input {
  &__instance {
    padding: 8px 6px;
    @include size-body-text;
    color: $color-black-72;
    width: 100%;
    border: none;
    transition: background-color 0.25s ease;
    border: 1px solid $color-black-100;

    &:hover {
      background-color: $color-yellow-10;
      border: 1px solid $color-yellow-100;
    }

    &:focus {
      background-color: $color-white-100;
      outline: 2px solid $color-yellow-100;
      border:  1px solid transparent;
    }
  }

  textarea {
    min-height: 210px;
    resize: none;
  }
}
</style>
