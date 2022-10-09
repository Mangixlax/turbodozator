<template>
  <footer :class="$style['footer']">
    <div :class="$style['footer__container']">
      <div :class="$style['footer__left']">
        <logo :variant="'black'" :class="$style['footer__left-logo']" />
        <nav :class="$style['footer__navigation']">
          <nuxt-link
            v-for="(item, index) in footerMenu"
            :to="item.route"
            :key="index"
            :class="$style['footer__navigation-link']"
            :exact-active-class="$style['footer__navigation-link--active']"
          >
            {{ item.label }}
          </nuxt-link>
        </nav>
        <div :class="$style['footer__left-text']">
          © {{ getFullYear }} - Учись говорить правильно вместе с LogoLion.
        </div>
      </div>
      <div :class="$style['footer__right']">
        <div :class="$style['footer__subscribe']">
          <div :class="$style['footer__subscribe-title']">
            Подпишись чтобы не пропустить!
          </div>
          <div :class="$style['footer__subscribe-description']">
            {{
              "Чтобы получать уведомления о скидках на занятия, не забудь подписаться :)"
            }}
          </div>
          <div :class="$style['footer__subscribe-form']">
            <ui-form-input
              placeholder="Ваш e-mail"
              v-model="$v.form.email.$model"
              :class="$style['footer__subscribe-input']"
            />
            <ui-form-button
              :variant="'sm'"
              :class="$style['footer__subscribe-button']"
            >
              Вперед!
            </ui-form-button>
          </div>
          <span :class="$style['footer__subscribe-error']">
            <span
              :class="$style['footer__subscribe-text']"
              v-if="$v.form.email.$error"
            >
              Введите корректный e-mail
            </span>
          </span>
        </div>
        <div :class="$style['footer__socials']">
          <div :class="$style['footer__socials-title']">Мои соцсети</div>
          <base-footer-icons class="$style['footer__socials-icons']" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { validationMixin } from "vuelidate";
import { email, required } from "vuelidate/lib/validators";
import BaseFooterIcons from "~/components/Base/BaseFooter/BaseFooterIcons.vue";
import Logo from "~/components/Logo.vue";
import UiFormInput from "~/components/Ui/Form/UiFormInput.vue";
import UiFormGroup from "~/components/Ui/Form/UiFormButton.vue";
import UiFormButton from "~/components/Ui/Form/UiFormButton.vue";

interface Form {
  email: string;
}

@Component({
  components: {
    BaseFooterIcons,
    Logo,
    UiFormInput,
    UiFormButton,
  },
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
})
export default class BaseFooter extends Vue {
  public footerMenu: Array<object> = [
    {
      label: "Блог",
      route: { name: "index" },
    },
    {
      label: "Портфолио",
      route: { name: "portfolio" },
    },
    {
      label: "Обо мне",
      route: { name: "about" },
    },
    {
      label: "Контакты",
      route: { name: "contacts" },
    },
  ];

  public form: Form = {
    email: "",
  };

  public finishModalTexts = {
    success: {
      title: "Успех!",
      description:
        "Ваша заявка успешно отправлена! Ожидайте, мой менеджер обязательно с вами свяжется.",
    },
    error: {
      title: "Ошибка :(",
      description:
        "Произошла ошибка. Пожалуйста, побробуйте еще раз немного позднее...",
    },
  };

  get getFullYear() {
    return new Date().getFullYear();
  }

}
</script>

<style lang="scss" module>
.footer {
  width: 100%;

  &__container {
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    padding: 100px 20px;
    justify-content: space-between;
  }

  &__left {
    display: flex;
    flex-direction: column;

    &-logo {
      margin-bottom: 32px;
    }

    &-text {
      @include size-body-text;
    }
  }

  &__navigation {
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;

    &-link {
      @include size-h3-semi-bold;
      text-decoration: none;
      color: $color-black-100;
      position: relative;
      width: fit-content;

      & + & {
        margin-top: 18px;
      }

      &--active:after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: $color-black-100;
      }
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
  }

  &__subscribe {
    display: flex;
    flex-direction: column;
    max-width: 335px;
    margin-bottom: 64px;

    &-title {
      @include size-h1-small-bold;
      margin-bottom: 8px;
      color: $color-black-100;
    }

    &-description {
      @include size-body-text;
      margin-bottom: 24px;
      color: $color-black-100;
    }

    &-form {
      display: flex;
      align-items: center;
    }

    &-error {
      @include size-body-error-text;
      color: $color-red-72;
      padding-top: 4px;
      height: 16px;
    }

    &-button {
      margin-left: 16px;
    }
  }

  &__socials {
    display: flex;
    flex-direction: column;
    margin-top: auto;

    &-title {
      @include size-h1-small-bold;
      margin-bottom: 16px;
    }

    &-icons {
      margin-top: auto;
    }
  }

  @media (max-width: 767px) {
    &__left {
      margin-bottom: 32px;
    }

    &__container {
      padding: 64px 20px;
      flex-direction: column;
    }

    &__subscribe {
      margin-bottom: 32px;
    }
  }
}
</style>
