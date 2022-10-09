<template>
  <li
    :class="[
      $style['navigation__item'],
      { [$style['navigation__item--active']]: isShowDropdown },
    ]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot :name="`link-${$vnode.key}`" :item="item">
      <nuxt-link
        :to="item.route"
        :class="$style['navigation__item-link']"
        :exact-active-class="$style['navigation__item-link--active']"
      >
        {{ item.label }}
      </nuxt-link>
    </slot>
    <div
      :class="{
        [$style['dropdown']]: true,
        [$style['dropdown--open']]: isShowDropdown,
      }"
    >
      <slot :name="`dropdown-${$vnode.key}`" :item="item"></slot>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import debounce from "lodash.debounce";

@Component
export default class BaseHeaderNavItem extends Vue {
  @Prop({ type: Object, default: () => {} }) item!: {
    route: string;
    label: string;
  };

  public isHoverOnItem: boolean = false;
  public isShowDropdown: boolean = false;

  @Watch("$route")
  onRouteChange() {
    this.isShowDropdown = false;
  }

  public onMouseEnter() {
    this.isHoverOnItem = true;
  }

  public onMouseLeave() {
    this.isHoverOnItem = false;
  }

  @Watch("isHoverOnItem")
  debounceWatch(...args: boolean[]) {
    this.debouncedCallback(...args);
  }

  debouncedCallback: Function = () => {};

  created() {
    this.debouncedCallback = debounce((value: boolean) => {
      this.isShowDropdown = value;
      this.$emit("isShowDropdown", value);
    }, 250);
  }
}
</script>

<style lang="scss" module>
.navigation__item {
  display: flex;
  align-items: center;
  margin: 0 30px;

  @media (max-width: 1100px) {
    display: none;
  }

  &-list {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &-item {
    display: inline-block;
  }

  &-link {
    @include size-h3-regular;
    text-decoration: none;
    color: $color-white-100;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    position: relative;

    &--active:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 2px;
      background-color: $color-white-100;
    }
  }

  &--active &-link:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background-color: $color-white-100;
  }
}

.dropdown {
  position: absolute;
  width: calc(100vw - var(--scrollbar-width));
  top: 100px;
  left: calc(-50vw + 50% + (var(--scrollbar-width) / 2));
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  background: $color-white-100;
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 32px 32px rgba(0, 0, 0, 0.08);

  &--open {
    opacity: 1;
    z-index: 100;
    pointer-events: all;
  }
}
</style>
