<template>
  <div :class="$style['benefits']">
    <div :class="$style['benefits__container']">
      <div :class="$style['benefits__info']">
        <h2 :class="$style['benefits__info-title']">Преимущества</h2>
        <span :class="$style['benefits__info-description']">
          ТДЗ был разработан с целью повысить надежность и упростить
          эксплуатацию противопожарного оборудования, работающего с
          пенообразователями.
        </span>
      </div>
      <div :class="$style['benefits__cards']">
        <benefits-card
          v-for="(card, index) in benefitsCards"
          :key="index"
          :card="card"
        />
      </div>
      <div :class="$style['benefits__video']">
        <div :class="$style['benefits__video-container']">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/ZEdZfWa9tzo"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            :class="$style['benefits__video-frame']"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import BenefitsCard from '~/components/Benefits/BenefitsCard.vue'

@Component({
  components: {
    BenefitsCard,
  },
})
export default class Benefits extends Vue {
  public benefitsCards: Array<object> = [
    {
      icon: 'benefits/technology',
      title: 'Технологичность',
      description: `Высокая технологичность обеспечивает надежность непрерывного процесса пенообразования`,
    },
    {
      icon: 'benefits/compact',
      title: 'Компактность',
      description: `Высокая технологичность обеспечивает надежность непрерывного процесса пенообразования`,
    },
    {
      icon: 'benefits/autonomy',
      title: 'Автономность',
      description: `Высокая технологичность обеспечивает надежность непрерывного процесса пенообразования`,
    },
  ]
}
</script>

<style lang="scss" module>
.benefits {
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
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 45px;
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

  @media (max-width: 1024px) {
    &__info {
      &-description {
        @include size-body-text;
      }
    }
    &__cards {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 768px) {
    &__info {
      align-items: initial;

      &-title {
        @include size-h2-small;
      }

      &-description {
        text-align: initial;
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
        border-radius: 25px;
      }
    }
  }
}
</style>