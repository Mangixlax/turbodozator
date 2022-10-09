<template>
  <div :class="$style['wrapper']">
    <p v-if="list.title" :class="$style['wrapper__title']">{{ list.title }}</p>
    <ul :class="$style['wrapper__list']">
      <li
        :class="$style['wrapper__list-item']"
        v-for="(link, index) in list.links"
        :key="index"
      >
        <nuxt-link
          :to="{ name: link.route.name, params: link.route.params }"
          :class="$style['wrapper__list-link']"
        >
          {{ link.label }}
          <span :class="$style['wrapper__list-link-amount']">
            {{ link.amount }}
          </span>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component
export default class BaseHeaderList extends Vue {
  @Prop({ type: Object, default: () => {} }) list!: Object
}
</script>

<style lang="scss" module>
.wrapper {
  &.row {
    display: flex;
  }

  &__title {
    @include size-h3-semi-bold;
    margin: 0 20px 24px 0;
    color: $color-black-48;
  }

  &__list {
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    list-style: none;

    &-item {
      display: inline-block;

      &:not(:last-child) {
        margin-bottom: 14px;
      }
    }

    &-link {
      @include size-h3-semi-bold;
      text-decoration: none;
      display: block;
      color: $color-black-100;

      &-amount {
        @include size-h3-semi-bold;
        color: $color-black-32;
        margin-left: 8px;
      }
    }
  }
}
</style>
