<template>
  <div :class="$style['contacts-card']">
    <svg-icon :name="`contacts/${card.icon}`" :class="$style['contacts-card__icon']" />
    <span :class="$style['contacts-card__text']" v-html="card.text" />
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
export default class ContactsCard extends Vue {
  @Prop({ type: Object, default: () => {} }) card!: object
}
</script>

<style lang="scss" module>
.contacts-card {
  width: 100%;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;

  outline: none;

  &:hover {
    outline: solid 1px $color-black-32;

    .contacts-card__icon {
      transform: translateY(8px);
    }
  }

  &__icon {
    height: 48px;
    width: 48px;
    margin-bottom: 8px;
    transition: transform 0.5s ease;
  }

  &__text {
    @include size-body-tiny-text;
    color: $color-black-88;
    margin-bottom: 15px;
    text-align: center;
  }

  @media (max-width: 767px) {
    outline: solid 1px $color-black-32;
  }
}
</style>
