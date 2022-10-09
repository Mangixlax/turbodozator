<template>
  <div :class="$style['technical']">
    <div :class="$style['technical__container']">
      <div :class="$style['technical__info']">
        <h2 :class="$style['technical__info-title']">
          Технические характеристики
        </h2>
        <span :class="$style['technical__info-description']">
          ТДЗ не имеет аналогов на российском рынке, модель доступна в 3-х
          исполнениях.
        </span>
        <ui-form-button>Ознакомиться</ui-form-button>
      </div>
      <div :class="$style['technical__cards']">
        
      </div>
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
  },
})
export default class Technical extends Vue {
  public technicalCards: Array<object> = [
    {
      icon: 'technical/technology',
      title: 'Технологичность',
      description: `Высокая технологичность обеспечивает надежность непрерывного процесса пенообразования`,
    },
    {
      icon: 'technical/compact',
      title: 'Компактность',
      description: `Высокая технологичность обеспечивает надежность непрерывного процесса пенообразования`,
    },
    {
      icon: 'technical/autonomy',
      title: 'Автономность',
      description: `Высокая технологичность обеспечивает надежность непрерывного процесса пенообразования`,
    },
  ]
}
</script>

<style lang="scss" module>
.technical {
  width: 100%;
  padding: 90px 0px;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
  }

  &__info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 60px;

    &-title {
      @include size-h2-regular;
      margin: 0;
      margin-bottom: 24px;
      color: $color-black-100;
    }

    &-description {
      @include size-body-big-text;
      color: $color-black-88;
      text-align: center;
    }
  }

  &__cards {
    max-width: 900px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 50px;
    margin-bottom: 64px;
  }

  &__video {
    max-width: 900px;
    margin: 0 auto;

    &-container {
      position: relative;
      padding-bottom: 56.25%;
    }

    &-frame {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      border-radius: 50px;
    }
  }
}
</style>
