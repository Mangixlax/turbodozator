<template>
  <div :class="$style['partners']">
    <div :class="$style['partners__container']">
      <h2 :class="$style['partners__container-title']">Партнеры</h2>
      <p :class="$style['partners__container-description']">
        Наши партнеры не раз доказавшие свою профессиональность
      </p>
      <div :class="$style['partners__cards']">
        <partners-card
          v-for="(card, index) in partnersCards"
          :key="index"
          :card="card"
        />
      </div>
      <ui-form-button
        :class="$style['partners__container-button']"
      >
        Напишите нам!
      </ui-form-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import PartnersCard from '~/components/Partners/PartnersCard.vue'
import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'

@Component({
  components: {
    PartnersCard,
    UiFormButton,
  },
})
export default class Partners extends Vue {
  public partnersCards: Array<object> = [
    {
      title: 'Главнефть',
      image: 'glavneft',
    },
    {
      title: 'AB InBev',
      image: 'abinbev',
    },
    {
      title: 'Финам',
      image: 'finam',
    },
    {
      title: 'HEINEKEN',
      image: 'heineken',
    },
    {
      title: 'МЧС России',
      image: 'mchs',
    },
    {
      title: 'Новатэк',
      image: 'novatek',
    },
    {
      title: 'Русский стандарт',
      image: 'russtandart',
    },
    {
      title: 'Синергия',
      image: 'synergy',
    },
    {
      title: 'TATSPIRTPROM',
      image: 'tatspirtprom',
    },
    {
      title: 'Транснефть',
      image: 'transneft',
    },
  ]
}
</script>

<style lang="scss" module>
.partners {
  width: 100%;
  background-size: cover;
  padding: 100px 0;

  &__container {
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    text-align: center;
    align-items: center;

    &-title {
      @include size-h1-big;
      color: $color-black-100;
      margin: 0;
      margin-bottom: 18px;
    }

    &-description {
      @include size-body-big-text;
      color: $color-black-88;
      margin: 0;
      margin-bottom: 64px;
    }
  }

  &__cards {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-auto-rows: 150px;
    grid-gap: 4px;
    margin-bottom: 64px;
  }

  @media (max-width: 1024px) {
    padding: 64px 0;

    &__cards {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 767px) {
    padding: 32px 0;

    &__container {
      &-title {
        @include size-h1-small
      }

      &-description {
        @include size-body-text;
        margin-bottom: 32px;
      }
    }

    &__cards {
      grid-template-columns: 1fr;
    }
  }
}
</style>
