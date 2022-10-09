<template>
  <div :class="$style['partners']">
    <div :class="$style['partners__container']">
      <!-- <div :class="$style['partners__info']">
        <h1 :class="$style['partners__info-title']">
          ТУРБОДОЗАТОР ТДЗ
        </h1>
        <span :class="$style['partners__info-description']">
          Лучшее решение среди дозаторов пенообразователя
        </span>
        <ui-form-button :color="'red'">Узнать больше</ui-form-button>
      </div>
      <img :src="require('@/assets/images/partners/partners-tdz.png')" alt="турбодозатор" :class="$style['partners__bg']"> -->
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'

@Component({
  components: {
    UiFormButton
  }
})
export default class Partners extends Vue {}
</script>

<style lang="scss" module>
.partners {
  width: 100%;
  background-size: cover;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
  }

  &__info {
    display: flex;
    flex-direction: column;
    color: $color-white-100;
    width: fit-content;
    padding-bottom: 350px;
    position: relative;
    z-index: 2;

    &-title {
      @include size-h1-big;
      margin: 0;
      margin-bottom: 24px;
    }

    &-description {
      @include size-body-text;
      margin-bottom: 140px;
    }
  }

  &__bg {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 730px;
    height: auto;
  }

  @media (max-width: 768px) {

    &__info {
      &-title {
        @include size-h1-small
      }
    }
    &__bg {
      width: 450px;
    }
  }
}
</style>
