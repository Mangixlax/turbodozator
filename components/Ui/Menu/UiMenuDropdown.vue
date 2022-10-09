<template>
  <div
    :class="{
      [$style['dropdown']]: true,
      [$style['open']]: isShowList,
      [$style['overflow']]: isOverFlow,
      [$style['icon--primary']]: iconColor === 'primary',
      [$style['icon--black']]: iconColor === 'black',
    }"
    tabindex="0"
  >
    <div :class="$style['dropdown__header']" @click="onToggle" @focus="onFocus">
      <span
        v-if="$slots['icon-before']"
        :class="[$style['icon'], $style['icon-before']]"
      >
        <slot name="icon-before"></slot>
      </span>
      <div :class="{ [$style['dropdown__label']]: true }">
        <slot name="label"></slot>
      </div>
      <span :class="$style['button']">
        <svg-icon
          name="dropdown-menu"
          :class="$style['button--dropdown']"
        ></svg-icon>
      </span>
    </div>
    <div
      :style="{ height: listHeight }"
      :class="$style['dropdown__list-wrapper']"
    >
      <div ref="list" :class="$style['dropdown__list']">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component
export default class UiMenuDropdown extends Vue {
  @Prop({ type: Boolean, default: false }) isOpen!: boolean
  @Prop({ type: String, default: '' }) iconColor!: string

  public isShowList: boolean = false
  public isFocused: boolean = false
  public isOverFlow: boolean = false
  public listHeight: string = '0px'

  onToggle() {
    if (!this.isShowList) {
      this.open()
    } else {
      this.close()
    }
  }

  open() {
    this.listHeight = (this as any).$refs.list.clientHeight + 'px'
    this.isShowList = true
    setTimeout(() => {
      this.isOverFlow = true
    }, 300)
  }

  close() {
    this.isOverFlow = false
    this.listHeight = '0px'
    this.isShowList = false
  }

  onFocus(evt: any) {
    this.isFocused = true
    this.isShowList = true
    this.$emit('focus', evt)
  }

  onBlur(evt: any) {
    this.isFocused = false
    this.$emit('blur', evt)
  }

  public calculateDropdownHeight() {
    this.listHeight = (this as any).$refs.list.clientHeight + 'px'
  }

  mounted() {
    if (this.isOpen) {
      this.open()
    }
    window.addEventListener('resize', this.calculateDropdownHeight)
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.calculateDropdownHeight)
  }
}
</script>

<style lang="scss" module>
.dropdown {
  width: 100%;

  &__header {
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    padding: 16px 12px 16px 24px;
  }

  &__label {
    @include size-h3-regular;
    color: $color-blue-100;
    margin: 0;
    margin-right: auto;
  }

  &__list {
    padding: 16px 24px 32px 24px;

    & > *:not(:last-child) {
      margin-bottom: 16px;
    }

    &-item {
      position: relative;
    }

    &-wrapper {
      transition: height 0.15s ease;
      overflow: hidden;

      .overflow & {
        overflow: initial;
      }
    }
  }
}

.button {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &--dropdown {
    margin: auto;
    fill: $color-blue-100;
    width: 22px;
    height: 22px;
    transition: transform 0.3s ease;

    .open & {
      transform: rotate(180deg);
    }
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

    .icon--black & {
      fill: $color-black-100;
    }
  }
}
</style>
