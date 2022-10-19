<template>
  <div :class="$style['partners-card']">
    <span :class="$style['partners-card__title']">{{ card.title }}</span>
    <img
      :src="require(`@/assets/images/partners/${card.image}.png`)"
      :alt="card.title"
      :class="$style['partners-card__image']"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'

@Component({
  components: {
    UiFormButton,
  },
})
export default class PartnersCard extends Vue {
  @Prop({ type: Object, default: () => {} }) card!: object
}
</script>

<style lang="scss" module>
.partners-card {
  width: 100%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: solid 1px $color-black-8;

  &__title {
    @include size-h3-semi-bold;
    color: $color-black-100;
    margin-bottom: 15px;
  }
}
</style>
