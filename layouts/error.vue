<template>
  <div :class="$style['container']">
    <logo :class="$style['logo']"></logo>
    <h1 :class="$style['h1']">{{ error.statusCode }}</h1>
    <div v-if="error.statusCode === 404" :class="$style['text']">
      <p>
        Страница, на которую вы пришли, не существует. Вы можете попробовать
        следующее:
      </p>
      <ul>
        <li>
          <p>
            Вернитесь туда, откуда вы пришли (нажмите кнопку \"Назад\" в вашем
            браузере);
          </p>
        </li>
        <li>
          <p>Проверьте правильность введенного адреса;</p>
        </li>
        <li>
          <p>
            Перейти на<nuxt-link :to="{ name: 'index' }"
              >главную страницу сайта</nuxt-link
            >
          </p>
        </li>
      </ul>
    </div>
    <div v-else :class="[$style['text'], $style['text--center']]">
      <p>
        Уважаемые пользователи! Эта ошибка известна и будет исправлена в
        ближайшее время.
      </p>
      <p>
        Пожалуйста, наберитесь терпения. Попробуйте вернуться на<nuxt-link
          :to="{ name: 'index' }"
          >главную страницу сайта</nuxt-link
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Logo from '@/components/Logo.vue'

type Error = {
  statusCode: number
  message: string
}

type ErrorText = {
  title: string
  subtitle: string
}

type ErrorTexts = {
  [key: number]: ErrorText
  default: ErrorText
}

export default Vue.extend({
  name: 'ErrorPage',
  components: {
    Logo,
  },
  layout: 'empty',
  props: {
    error: {
      type: Object as () => Error,
      required: true,
    },
  },

  data: () => ({
    texts: {
      404: {
        title: '404. Page not found',
        subtitle: 'Something went wrong, no such address exists',
      },
      default: {
        title: 'Unknown error',
        subtitle:
          'Something went wrong, but we`ll try to figure out what`s wrong',
      },
    } as ErrorTexts,
  }),

  computed: {
    errorText(): ErrorText {
      const { statusCode } = this.error
      return this.texts[statusCode] || this.texts.default
    },
  },
})
</script>

<style lang="scss" module>
.container {
  background-color: white;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
  z-index: 40;
  position: absolute;
  top: 0;
  left: 0;
}

.h1 {
  @include size-h1-big;
  font-size: 200px;
  line-height: 296px;
  text-align: center;
  letter-spacing: -3.5px;
  margin: 0;
}

.logo {
  padding: 0 !important;
}

.text {
  @include size-body-text;
  
  &--center {
    text-align: center;
  }

  p {
    margin: 0;
    margin-bottom: 14px;

    a {
      margin: 0 4px;
      text-decoration: none;
      color: $color-black-100;
      border-bottom: 1px solid $color-black-100;
      padding-bottom: 4px;
    }
  }

  ul {
    @include size-body-tiny-text;
    list-style: none;
    padding-left: 34px;
    margin-top: 0;
  
    li {
      position: relative;
    }

    li:before {
      content: '-';
      position: absolute;
      left: -26px;
      top: 0;
    }
  }
}
</style>
