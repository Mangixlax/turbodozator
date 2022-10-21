<template>
  <div :class="$style['benefits-card']">
    <svg-icon :name="card.icon" :class="$style['benefits-card__icon']"></svg-icon>
    <h2 :class="$style['benefits-card__title']">{{ card.title }}</h2>
    <span :class="$style['benefits-card__description']">
      {{ card.description }}
    </span>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class benefitsCard extends Vue {
  @Prop({ type: Object, default: () => {} }) card!: Object
}
</script>

<style lang="scss" module>
.benefits-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 24px;

  &:hover {
    outline: solid 1px $color-black-32;

    .benefits-card__icon {
      transform: translateY(8px);
    }
  }

  &__icon {
    height: 72px;
    width: 72px;
    margin-bottom: 20px;
    transition: transform 0.5s ease;
  }

  &__title {
    @include size-h3-semi-bold;
    margin: 0;
    margin-bottom: 20px;
    color: $color-black-100;
  }

  &__description {
    @include size-body-text;
    margin: 0;
    margin-bottom: 20px;
    color: $color-black-72;
  }

  @media (max-width: 1024px) {
    border: solid 1px $color-blue-100
  }
}
</style>
