<template>
  <div :class="$style['technical']">
    <div :class="$style['technical__container']">
      <table :class="$style['technical__table']">
        <thead :class="$style['technical__table-head']">
          <tr>
            <th rowspan="2">№ п/п</th>
            <th rowspan="2">Наименование параметра</th>
            <th colspan="3">Характеристики</th>
          </tr>
          <tr>
            <th>ТДЗ-01</th>
            <th>ТДЗ-02</th>
            <th>ТДЗ-03</th>
          </tr>
        </thead>
        <tbody :class="$style['technical__table-body']">
          <tr>
            <td>1</td>
            <td>Диапазон рабочих давлений, МПа</td>
            <td colspan="3">0,3…1,2</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Диапазон расходов воды, куб.м./мин</td>
            <td>0,5...3,0</td>
            <td>1,0…6,5</td>
            <td>1,5…12,0</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Диапазон рабочих температур, °C</td>
            <td colspan="3">+2 … +50</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Относительная влажность, %</td>
            <td colspan="3">0 ... 100</td>
          </tr>
          <tr>
            <td>5</td>
            <td>Климатическое исполнение</td>
            <td colspan="3">УХЛ</td>
          </tr>
          <tr>
            <td>6</td>
            <td>Диапазон температур хранения, °C</td>
            <td colspan="3">-30 ... +50</td>
          </tr>
          <tr>
            <td>7</td>
            <td>Процент дозирования, %</td>
            <td colspan="3">1%; 3%; 6%</td>
          </tr>
          <tr>
            <td>8</td>
            <td>Входной/выходной фланцы для воды/резьба</td>
            <td>Ду100, М16</td>
            <td>Ду150, М18</td>
            <td>Ду200, М20</td>
          </tr>
          <tr>
            <td>9</td>
            <td>Уровень шума не более, дБ (А)</td>
            <td colspan="3">75</td>
          </tr>
          <tr>
            <td>10</td>
            <td>Ду штуцера подключения линии подачи пенообразователя, мм</td>
            <td>45</td>
            <td>50</td>
            <td>65</td>
          </tr>
          <tr>
            <td>11</td>
            <td>Материал исполнения корпуса</td>
            <td colspan="3">чугун/бронза</td>
          </tr>
          <tr>
            <td>12</td>
            <td>Масса нетто (чугун/бронза), кг.</td>
            <td>125/130</td>
            <td>200/210</td>
            <td>400/425</td>
          </tr>
          <tr>
            <td>13</td>
            <td>Габаритные размеры (ДхШхВ), м.</td>
            <td>0,8х0,4х0,4</td>
            <td>0,9х0,5х0,5</td>
            <td>1,0х0,6х0,6</td>
          </tr>
          <tr>
            <td>14</td>
            <td>
              Рекомендуемый размер ячеек водяного фильтра на входе в ТДЗ, мм.
            </td>
            <td>3</td>
            <td>5</td>
            <td>7</td>
          </tr>
          <tr>
            <td>15</td>
            <td>Заправочный объем масла, литр</td>
            <td>0,6</td>
            <td>1,1</td>
            <td>1,5</td>
          </tr>
        </tbody>
      </table>
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
export default class TechnicalTable extends Vue {
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
  padding: 32px 0px;
  background: $color-black-100;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  &__table {
    height: 100%;
    width: 100%;
    border-collapse: collapse;
    &-head {
      width: 100%;

      tr,
      th {
        border: 1px solid $color-white-64;
        color: $color-white-100;
        @include size-h3-semi-bold;
        text-align: center;

        & + & {
          border: 1px solid $color-white-64;
        }
      }
    }

    &-body {
      width: 100%;

      tr,
      td {
        border: 1px solid $color-white-64;
        color: $color-white-100;
        @include size-h3-semi-bold;
        white-space: nowrap;
      }

      td[colspan='3'] {
        text-align: center;
      }

      td {
        padding: 8px 16px;
      }
    }
  }
  @media (max-width: 768px) {
    &__table {
      th {
        @include size-h3-small;
      }
    }
  }
}
</style>
