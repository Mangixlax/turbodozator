<template>
  <div :class="$style['main-screen']">
    <div :class="$style['main-screen__container']">
      <div :class="$style['main-screen__info']">
        <h1 :class="$style['main-screen__info-title']">
          ТУРБОДОЗАТОР ТДЗ
        </h1>
        <span :class="$style['main-screen__info-description']">
          Лучшее решение среди дозаторов пенообразователя
        </span>
        <ui-form-button :color="'red'">Узнать больше</ui-form-button>
      </div>
      <img :src="require('@/assets/images/main-screen/main-screen-tdz.png')" alt="турбодозатор" :class="$style['main-screen__bg']">
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
export default class MainScreen extends Vue {}
</script>

<style lang="scss" module>
.main-screen {
  width: 100%;
  background: url('@/assets/images/main-screen/main-screen-bg.jpg');
  padding: 90px 0px;
  height: calc(100vh - 90px);
  background-size: cover;

  &__container {
    max-width: 1200px;
    height: 100%;
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
    padding: 32px 0px;

    &__info {
      padding-bottom: initial;

      &-title {
        @include size-h1-small
      }

      &-description {
        margin-bottom: 32px;
      }
    }
    &__bg {
      width: 365px;
    }
  }
}
</style>
