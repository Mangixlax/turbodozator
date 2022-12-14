<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <section :class="$style['contacts']">
      <h2 :class="$style['contacts-title']">Свяжитесь с нами</h2>
      <p :class="$style['contacts-description']">
        Для получения дополнительной информации оставьте заявку:
      </p>
      <div :class="$style['contacts__container']">
        <ui-form-group tag="label" for="callback-name">
          <ui-form-label tag="div" required> Ваше имя </ui-form-label>
          <ui-form-input placeholder="Ваше имя" v-model="form.name" />
          <span :class="$style['contacts__container-error']">
            <span
              :class="$style['contacts__container-error-text']"
              v-if="$v.form.name.$error"
            >
              Введите имя
            </span>
          </span>
        </ui-form-group>
        <ui-form-group tag="label" for="callback-phone">
          <ui-form-label tag="div" required> Ваш номер телефона </ui-form-label>
          <ui-form-input
            v-model="form.phone"
            placeholder="+7"
            v-mask="'+7 (###) ###-##-##'"
          />
          <span :class="$style['contacts__container-error']">
            <span
              :class="$style['contacts__container-error-text']"
              v-if="$v.form.phone.$error"
            >
              Введите корректный телефон
            </span>
          </span>
        </ui-form-group>
        <ui-form-group tag="label" for="callback-email">
          <ui-form-label tag="div" required> Ваш Email </ui-form-label>
          <ui-form-input
            placeholder="Ваш e-mail"
            v-model="$v.form.email.$model"
          />
          <span :class="$style['contacts__container-error']">
            <span
              :class="$style['contacts__container-error-text']"
              v-if="$v.form.email.$error"
            >
              Введите корректный e-mail
            </span>
          </span>
        </ui-form-group>
        <ui-form-group tag="label" for="callback-text">
          <ui-form-label tag="div"> Ваше сообщение </ui-form-label>
          <ui-form-input
            placeholder="Ваше сообщение"
            tag="textarea"
            v-model="$v.form.message.$model"
          />
        </ui-form-group>

        <ui-form-group tag="label" :variant="'horizontal'">
          <ui-form-checkbox
            type="checkbox"
            :class="$style['contacts__container-agreement-checkbox']"
            v-model="$v.form.agree_collect_data.$model"
            :checked="$v.form.agree_collect_data.$model"
            :valid="!$v.form.agree_collect_data.$error"
          />

          <span
            :class="{
              [$style['contacts__container-agreement']]: true,
              [$style['contacts__container-agreement--error']]:
                $v.form.agree_collect_data.$error,
            }"
          >
            Я разрешаю собирать и обрабатывать мои данные
          </span>
        </ui-form-group>
        <ui-form-button
          :variant="'md'"
          :class="$style['contacts__container-submit']"
          @click="onSubmit"
        >
          Отправить
        </ui-form-button>
      </div>
    </section>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import Vue from 'vue'
import { Context } from '@nuxt/types'
import { Component, Prop } from 'nuxt-property-decorator'
import { validationMixin } from 'vuelidate'
import { mask } from 'vue-the-mask'
import { email, minLength, required, sameAs } from 'vuelidate/lib/validators'
import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'
import metaGenerator from '~/lib/meta'
import UiFormGroup from '~/components/Ui/Form/UiFormGroup.vue'
import UiFormLabel from '~/components/Ui/Form/UiFormLabel.vue'
import UiFormInput from '~/components/Ui/Form/UiFormInput.vue'
import UiFormButton from '~/components/Ui/Form/UiFormButton.vue'
import UiFormCheckbox from '~/components/Ui/Form/UiFormCheckbox.vue'
import ContactsCard from '~/components/Contacts/ContactsCard.vue'
import BaseFooterIcons from '~/components/Base/BaseFooter/BaseFooterIcons.vue'

interface Form {
  name: string
  email: string
  phone: string
  message: string
  agree_collect_data: boolean | string
}

@Component({
  components: {
    ModalWrapperSimple,
    UiFormGroup,
    UiFormLabel,
    UiFormInput,
    UiFormButton,
    UiFormCheckbox,
    ContactsCard,
    BaseFooterIcons,
  },
  mixins: [validationMixin],
  directives: { mask },
  validations: {
    form: {
      name: {
        required,
      },
      phone: {
        required,
        minLength: minLength(18),
      },
      email: {
        required,
        email,
      },
      message: {},
      agree_collect_data: {
        isChecked: (value: boolean) => value,
      },
    },
  },
})
export default class Contacts extends Vue {
  @Prop({ type: String, required: true })
  name!: string

  public form: Form = {
    name: '',
    email: '',
    phone: '',
    message: '',
    agree_collect_data: false,
  }

  public contactCards = [
    {
      icon: 'marker',
      text: 'Московское представительство<br> 115446, г.Москва, Коломенский проезд, д.8, к. 4',
      href: 'https://yandex.ru/maps/org/gk_spetsprodukt/138310307827/?ll=37.649238%2C55.664492&z=17',
    },
    {
      icon: 'mail',
      text: 'mail@bgsp.com',
      href: 'mailto: mail@bgsp.com',
    },
    {
      icon: 'phone',
      text: '8 (800) 333-78-37',
      href: 'tel:+78003337837',
    },
  ]

  public finishModalTexts = {
    success: {
      title: 'Успех!',
      description:
        'Ваша заявка успешно отправлена! Ожидайте, наш менеджер обязательно с вами свяжется.',
    },
    error: {
      title: 'Ошибка :(',
      description:
        'Произошла ошибка. Пожалуйста, побробуйте еще раз немного позднее...',
    },
  }

  get emailBody() {
    return {
      'your-name': this.form.name,
      'your-email': this.form.email,
      'your-phone': this.form.phone,
      'your-message': this.form.message,
    }
  }

  get formData() {
    const form = new FormData()
    for (const field in this.emailBody) {
      form.append(field, (this as any).emailBody[field])
    }
    return form
  }

  public async onSubmit() {
    this.$v.form.$touch()

    if (!this.$v.$invalid) {
      // Show recaptcha
      this.$axios
        .$post(
          `https://bgsp.bitrix24.ru/rest/3839/gm3t6jpouxohfc96/crm.lead.add.json?FIELDS[ASSIGNED_BY_ID]=4405&FIELDS[SOURCE_ID]=53&FIELDS[NAME]=${
            this.form.name
          }&FIELDS[PHONE][0][VALUE]=${this.form.phone.replace(
            /[^\d]/g,
            ''
          )}&FIELDS[EMAIL][0][VALUE]=${this.form.email}&FIELDS[COMMENTS]=${
            this.form.message
          }`
        )
        .then((responce) => {
          this.onResetForm()
          this.onShowFinishModal(this.finishModalTexts.success)
        })
        .catch((error) => {
          this.onShowFinishModal(this.finishModalTexts.error)
        })
    }
  }

  public onResetForm() {
    this.form.name = ''
    this.form.phone = ''
    this.form.email = ''
    this.form.message = ''
    this.$v.$reset()
  }

  public onShowFinishModal(text: object) {
    this.$modal.show({
      bind: {
        name: 'Callback',
        text: text,
      },
      component: () =>
        import('~/components/Modal/Content/FinishText/ModalFinishText.vue'),
    })
  }
}
</script>

<style lang="scss" module>
.contacts {
  width: 100%;
  background-size: cover;
  max-width: 350px;
  padding: 20px;

  &-title {
    @include size-h2-small;
    color: $color-black-100;
    margin: 0;
    margin-bottom: 8px;
  }

  &-description {
    @include size-body-text;
    color: $color-black-88;
    margin: 0 auto;
    margin-bottom: 6px;
    max-width: 903px;
  }

  &__container {
    width: 100%;
    margin: auto;
    vertical-align: middle;
    display: flex;
    flex-direction: column;

    &-title {
      @include size-h2-small;
      margin: 0;
      color: $color-black-100;
      white-space: nowrap;
    }

    &-submit {
      margin-top: 6px;
    }

    &-agreement {
      @include size-body-tiny-text;
      color: $color-black-88;

      &-checkbox {
        margin: 0;
        margin-right: 10px;
      }

      &--error {
        color: $color-red-72;
      }
    }

    &-error {
      @include size-body-error-text;
      color: $color-red-72;
      padding-top: 4px;
      height: 16px;
    }
  }

  @media (max-width: 1023px) {
    &__container {
      flex-direction: column-reverse;
    }

    &__right {
      margin-left: 0;
      margin-bottom: 32px;

      &-cards {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }

    &__left {
      max-width: initial;
    }
  }

  @media (max-width: 767px) {
    &-title {
      @include size-h1-small;
      text-align: initial;
      padding: 0 20px;
    }

    &-description {
      @include size-body-text;
      text-align: initial;
      padding: 0 20px;
    }

    &__right {
      &-cards {
        grid-template-columns: 1fr;
        grid-gap: 16px;
      }

      &-image {
        object-position: 100% center;
        height: 500px;
      }
    }
  }
}
</style>
