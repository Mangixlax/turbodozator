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
        <img
          v-for="(card, index) in technicalCards"
          :key="index"
          :src="require(`@/assets/images/technical/${card.image}`)"
          alt=""
          :class="$style['technical__cards-card']"
        />
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
    UiFormButton,
  },
})
export default class Technical extends Vue {
  public technicalCards: Array<object> = [
    {
      image: 'tdz-03.png',
    },
    {
      image: 'tdz-02.png',
    },
  ]
}
</script>

<style lang="scss" module>
.technical {
  width: 100%;
  padding: 90px 0px;
  background: $color-black-100;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
  }

  &__info {
    display: flex;
    flex-direction: column;
    margin-bottom: 60px;
    max-width: 695px;

    &-title {
      @include size-h2-regular;
      margin: 0;
      margin-bottom: 24px;
      color: $color-white-100;
    }

    &-description {
      @include size-body-big-text;
      color: $color-white-88;
      max-width: 603px;
      margin-bottom: 60px;
    }
  }

  &__cards {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;

    &-card {
      object-fit: contain;
      object-position: bottom;
      height: fit-content;

      & + & {
        margin-left: 64px;
      }
    }
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

  @media (max-width: 768px) {
    padding: 32px 0;

    &__info {
      &-title {
        @include size-h2-small;
      }

      &-description {
        @include size-body-text;
      }
    }

    &__cards {
      flex-direction: column-reverse;
      align-items: initial;

      &-card {
        width: fit-content;

        & + & {
          margin-left: initial;
          margin-bottom: 24px;
        }
      }
    }
  }
}
</style>
