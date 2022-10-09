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
      <img :src="require('@/assets/images/main-screen/main-screen-bg.png')" alt="турбодозатор" :class="$style['main-screen__bg']">
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
  background: radial-gradient(
    40.46% 44.08% at 64.21% 55.92%,
    rgba(45, 52, 54, 0.89) 0%,
    rgba(26, 30, 31, 0.885753) 30.87%,
    #212226 100%
  );
  padding: 90px 0px;
  height: calc(100vh - 90px);
  
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
}
</style>
