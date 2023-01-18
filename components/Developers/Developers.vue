<template>
  <div :class="$style['developers']">
    <div :class="$style['developers__container']">
      <div :class="$style['developers__info']">
        <h2 :class="$style['developers__info-title']">Для проектировщиков</h2>
        <span :class="$style['developers__info-description']">
          ТДЗ имеет 3 базовые комплектации.
        </span>
        <span :class="$style['developers__info-description']">
          У Вас есть возможность ознакомиться с каждой из них :
        </span>
      </div>
      <div :class="$style['developers__files']">
        <div :class="$style['developers__column']">
          <span :class="$style['developers__column-title']">
            Габаритные чертежи
          </span>
          <a
            :href="`/files/${item.link}`"
            target="_blank"
            v-for="(item, index) in gabariteDraws"
            :class="$style['developers__column-file']"
          >
            <svg-icon
              name="pdf-file"
              :class="$style['developers__column-file-svg']"
            />
            <span :class="$style['developers__column-file-label']">
              {{ item.label }}
            </span>
          </a>
        </div>
        <div :class="$style['developers__column']">
          <span :class="$style['developers__column-title']">
            Презентация ТДЗ
          </span>
          <a
            :href="`/files/${item.link}`"
            target="_blank"
            v-for="(item, index) in presentations"
            :key="index"
            :class="$style['developers__column-file']"
          >
            <svg-icon
              name="pdf-file"
              :class="$style['developers__column-file-svg']"
            />
            <span :class="$style['developers__column-file-label']">
              {{ item.label }}
            </span>
          </a>
        </div>
        <svg-icon
          name="developers/gear"
          :class="$style['developers__files-bg']"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class Developers extends Vue {
  public gabariteDraws: Array<object> = [
    {
      label: 'ТДЗ-01',
      link: 'ТДЗ-01 Габаритный чертеж.pdf',
    },
    {
      label: 'ТДЗ-02',
      link: 'ТДЗ-02 Габаритный чертеж .pdf',
    },
    {
      label: 'ТДЗ-03',
      link: 'ТДЗ-03 Габаритный чертеж.pdf',
    },
  ]

  public presentations: Array<object> = [
    {
      label: 'Black',
      link: 'Презентация Турбодозатор Black.pdf',
    },
    {
      label: 'White',
      link: 'Презентация Турбодозатор White.pdf',
    },
  ]
}
</script>

<style lang="scss" module>
.developers {
  width: 100%;
  padding: 80px 0px;
  background: url('~assets/images/developers/developers-bg.jpg');
  background-repeat: no-repeat;
  color: $color-white-100;
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
    background: $color-black-88;
    width: fit-content;
    padding: 16px 32px;
    margin: 0 auto;
    align-items: center;
    padding-bottom: 32px;
    margin-bottom: 80px;

    &-title {
      @include size-h1-big;
      padding: 10px;
      margin: 0;
      margin-bottom: 10px;
    }

    &-description {
      @include size-body-big-text;
    }
  }

  &__files {
    display: flex;
    padding: 56px 48px;
    background: $color-black-88;
    width: 100%;
    position: relative;
    overflow: hidden;

    &-bg {
      height: 640px;
      width: 640px;
      position: absolute;
      bottom: -267px;
      right: -260px;
      animation: rotation 60s ease infinite;
    }
  }

  &__column {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    z-index: 2;

    &-title {
      @include size-h2-regular;
      padding-left: 8px;
      margin-bottom: 40px;
    }

    &-file {
      @include size-h1-small;
      display: flex;
      align-items: center;
      color: $color-white-100;
      text-decoration: none;
      width: fit-content;
      transition: all 0.2s ease;

      & + & {
        margin-top: 60px;
      }

      &-svg {
        height: 80px;
        width: 80px;
        margin-right: 16px;
        fill: $color-white-100;
      }

      &:hover {
        transform: translateY(8px);

        .developers__column-file-label {
          text-shadow: 0 0 15px #fff;
        }
      }
    }
  }

  @media (max-width: 1000px) {
    &__info {
      align-items: flex-start;
      padding: 20px;

      &-title {
        @include size-h1-small;
        padding: 0;
        margin-bottom: 16px;
      }

      &-description {
        @include size-body-tiny-text;
      }
    }

    &__files {
      &-bg {
        height: 460px;
        width: 460px;
      }
    }

    &__column {
      &-title {
        @include size-h1-small;
        padding-left: 4px;
      }

      &-file {
        @include size-h3-regular;

        &-svg {
          height: 40px;
          width: 40px;
        }
      }
    }
  }

  @media (max-width: 880px) {
    &__files {
      flex-direction: column;
      padding: 24px 12px;
    }

    &__column {
      & + & {
        margin-top: 32px;
      }

      &-title {
        margin-bottom: 12px;
      }

      &-file {
        & + & {
          margin-top: 32px;
        }
      }
    }
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
