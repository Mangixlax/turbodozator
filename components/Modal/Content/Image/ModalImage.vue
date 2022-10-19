<template>
  <modal-wrapper-simple v-bind="{ ...$attrs, ...$props }" v-on="$listeners">
    <div :class="$style['modal-image']">
      <div :class="$style['modal-image__title']">{{ title }}</div>
      <img :src="$img(image)" :class="$style['modal-image__image']"> 
    </div>
  </modal-wrapper-simple>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import ModalWrapperSimple from '~/components/Modal/Wrapper/ModalWrapperSimple.vue'

@Component({
  components: {
    ModalWrapperSimple,
  },
})
export default class ModalImage extends Vue {
  @Prop({ type: String, required: true })
  name!: string
  @Prop({ type: String, required: true })
  title!: string
  @Prop({ type: String, default: '' })
  image!: string

}
</script>

<style lang="scss" module>
.modal-image {
  max-width: 1000px;
  width: 100%;
  padding: 0 24px 26px;
  display: flex;
  flex-direction: column;

  &__title {
    @include size-h2;
    margin-bottom: 32px;
  }

  &__image {
    margin: 24px 0 16px 0;
    display: block;
    margin: 0 auto;
    max-width: 700px;
    width: 100%;
    border-radius: 4px;
    object-fit: cover;
  }
}
</style>
