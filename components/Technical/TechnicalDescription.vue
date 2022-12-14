<template>
  <div :class="$style['technical-description']">
    <div :class="$style['technical-description__container']">
      <img
        :src="require(`@/assets/images/technical/na-palete.png`)"
        alt="разводка турбодозатора"
      />
      <h2>Назначение Турбодозатора</h2>
      <p>
        Турбодозатор – предназначен для дозирования концентрата пенообразователя
        из емкости хранения в воду для целей пожаротушения с заданным,
        фиксированным процентом дозирования в диапазоне указанных давлений и
        расходов воды.
      </p>
      <p>
        Турбодозатор использует воду, подаваемую под давлением от пожарного
        насоса как источник привода, с частичной потерей давления. Турбодозатор
        является энергонезависимым устройством и для его привода не требуется
        источник электроэнергии или какой-либо другой внешний привод кроме воды
        под давлением, подаваемой пожарным насосом.
      </p>
      <p>
        Турбодозатор не требует специальных процедур настройки и запуска в
        работу, включается самостоятельно при подаче воды.
      </p>
      <p>
        Турбодозатор не требует каких-либо систем управления, обеспечивая
        требуемый процент дозирования во всем диапазоне расходов подаваемой воды
        автоматически, и что особенно важно диапазон расходов является очень
        широким для каждой из моделей.
      </p>
      <p>
        Турбодозатор подходит для применения в большинстве систем пожаротушения,
        в том числе комбинированных, может использоваться как в стационарных
        системах, так и в мобильном исполнении, например, в пожарных машинах, на
        прицепах или на транспортировочной тележке.
      </p>
      <h2>Основные компоненты</h2>
      <p>– гидравлический двигатель с двумя роторами;</p>
      <p>– шестеренный насос для подачи пенообразователя;</p>
      <p>– коробка передач с синхронизирующими шестернями;</p>
      <p>– линия промывки шестеренного насоса с фильтром тонкой очистки;</p>
      <p>– линия всасывания пенообразователя;</p>
      <p>– трехходовой кран;</p>
      <p>– линия нагнетания пенообразователя в воду.</p>
      <h2>Устройство Турбодозатора</h2>
      <img
        :src="require(`@/assets/images/technical/reliability.png`)"
        alt="разводка турбодозатора"
      />
      <p>
        Гидравлический двигатель и шестеренный насос интегрированы друг с другом
        в едином сборном корпусе и при каждом обороте валов гидравлического
        двигателя через него проходит фиксированный объем воды, и одновременно
        при каждом обороте шестеренного насоса в выходящую из Турбодозатора воду
        подается фиксированный объем пенообразователя, заданный геометрическими
        параметрами шестеренного насоса и определяющий процент дозирования.
        Процент дозирования означает, что на выходе из Турбодозатора на единицу
        объёма раствора пенообразователя приходится по объёму соответственно: ,
        3% или 6% пенообразователя, остальное – вода.
      </p>
      <p>
        Гидравлический двигатель выполнен на базе инверсивного насоса Рутса и
        приводится в действие водой под давлением, подаваемой внешним пожарным
        насосом, и вращающей два ротора, входящих между собой в синхронное
        зацепление. Для обеспечения точной синхронизации этих роторов
        используются специальные синхронизирующие шестерни, вращающиеся в
        отдельной части корпуса Турбодозатора – коробке передач, заполненной
        трансмиссионным маслом и закрываемой крышкой со смотровым глазком для
        контроля уровня масла.
      </p>
      <img
        :src="require(`@/assets/images/technical/manufacturability.png`)"
        alt="трансимсиия"
      />
      <p>
        Шестеренный насос имеет ведущую и ведомую шестерни, расположенные на тех
        же валах, что и роторы гидравлического двигателя. Шестерни выполнены из
        специального пластика, устойчивого к высоким нагрузкам, трению и
        химическому воздействию пенообразователя. При вращении шестерен на линии
        всасывания пенообразователя создается разрежение и пенообразователь
        попадет в шестеренный насос, который нагнетает его через линию подачи в
        турбулентный поток воды, выходящий из Турбодозатора, что обеспечивает
        эффективное смешивание.
      </p>
      <p>
        Турбодозатор имеет трехходовой шаровой кран, который установлен в линии
        подачи пенообразователя, соединяющейся с шестеренным насосом. Этот
        трехходовой кран служит в качестве переключателя, подавая через
        шестеренный насос либо пенообразователь, либо воду для промывки, с
        помощью которой остатки пенообразователя могут быть вымыты из
        шестеренного насоса после окончания использования. В стационарных
        системах пожаротушения данный кран может быть заменен на кран с приводом
        для автоматизации процесса открытия линии подачи пенообразователя.
        Фильтр тонкой очистки, установленный в линии промывки, гарантирует, что
        в шестеренный насос будет поступать только достаточно чистая вода.
      </p>
      <p>
        Турбодозатор устойчив к наличию различных мелких загрязнений в
        подаваемой воде. Твердые частицы загрязнений могут проходить через
        гидравлический двигатель. Для ограничения допустимого размера частиц
        загрязнений необходимо использовать на входе в Турбодозатор пожарный
        фильтр. Рекомендуется применение универсального пожарного фильтра малого
        гидравлического сопротивления (желательно с наличием линии промывки).
        Тонкость фильтрации воды на входе в Турбодозатор обеспечивается внешним
        фильтром на уровне от 3 мм. до 7 мм.
      </p>
      <img
        :src="require(`@/assets/images/technical/na-telege.png`)"
        alt="разводка турбодозатора"
      />
      <p>
        Турбодозатор предусматривает использование как в стационарных системах
        пожаротушения, так и на пожарных автомобилях, прицепах и в простом
        мобильном варианте, например, на транспортировочной тележке.
        Транспортировочная тележка имеет прочную сварную раму, выдерживающую
        нагрузку от веса Турбодозатора с подсоединенной трубной обвязкой.
        Тележку легко перемещать за ручку, которая имеет возможность свободно
        вращаться вокруг оси крепления и наклоняться под любым углом к
        горизонту.
      </p>
      <p>
        Турбодозатор – представляет собой устройство, устанавливаемое на водяной
        магистрали, для обеспечения автоматического дозирования пенообразователя
        из ёмкости в поток воды.
      </p>
      <p>
        При прохождении потока воды через турбодозатор осуществляется вращение
        турбины. Вращательное движение турбины передается на ось, которая
        приводит в действие объёмный насос, входящий в состав конструкции
        изделия. Объёмный насос осуществляет забор пенообразователя из системы
        хранения и дозирования и обеспечивает автоматическую подачу
        пенообразователя в магистраль под давлением выше, чем давление воды,
        обеспечивая требуемую концентрацию раствора.
      </p>
      <p>
        Дозатор турбинный осевой предназначен для точного смешивания концентрата
        пенообразователя для систем пожаротушения с пресной или морской водой в
        пропорциях 3% и 6%. Область применения турбинного дозатора не
        ограничена. Рекомендовано применение на потенциально взрывопожароопасных
        объектах.
      </p>
      <img
        :src="require(`@/assets/images/technical/compact.png`)"
        alt="Турбодозатор в противопожарной системе"
      />
      <p>
        Турбодозатор не требует специальных процедур настройки и запуска в
        работу, включается самостоятельно при подаче воды. Турбодозатор не
        требует каких-либо систем управления, обеспечивая требуемый процент
        дозирования во всем диапазоне расходов подаваемой воды автоматически, и
        что особенно важно диапазон расходов является очень широким для каждой
        из моделей.
      </p>
      <p>
        Турбинный дозатор осевой подходит для применения в большинстве систем
        пожаротушения, в том числе комбинированных, может использоваться как в
        стационарных системах, так и в мобильном исполнении, например, в
        пожарных машинах, на прицепах или на транспортировочной тележке.
      </p>
      <p>
        Компания «Завод Спецхимпродукт» выпускает турбодозаторы моделей: ТДЗ –
        01, 02, 03, согласно ТУ 28.13.13-039-78148123-2020.
      </p>

      <h2>Отличительные особенности</h2>
      <ul>
        <li>
          ТДЗ-01,02,03 являются наиболее надёжными из устройств для дозирования
          пенообразователя в воду, так как осуществляет дозирование в широких
          диапазонах расходов за счёт энергии потока воды в магистрали, без
          дополнительных источников энергии;
        </li>
        <li>
          материалы, из которых изготавливаются дозаторы ТДЗ-01,02,03, не
          подвергаются сказывающемуся на работоспособности изделия негативному
          влиянию воды (в том числе жёсткой и морской) и примесей, водных
          растворов пенообразователя и различных видов пенообразователя;
        </li>
        <li>
          применение турбодозатора позволяет значительно упростить систему
          дозирования (отсутствует необходимость установки насосной группы
          подачи пенообразователя и дополнительных клапанов), сократить
          трудоёмкость и стоимость работ при эксплуатации;
        </li>
        <li>
          возможность проверки работоспособности турбодозатора (функция
          циркуляции пенообразователя из ёмкости и обратно в ёмкость);
        </li>
        <li>
          практически отсутствует необходимость технического обслуживания
          дозатора ТДЗ-01,02,03 благодаря его простой и прочной конструкции.
        </li>
      </ul>

      <h3>Дозатор турбинный состоит из следующих основных элементов:</h3>
      <ul>
        <li>гидравлический двигатель с двумя роторами;</li>
        <li>шестеренный насос для подачи пенообразователя;</li>
        <li>коробка передач с синхронизирующими шестернями;</li>
        <li>линия промывки шестеренного насоса с фильтром тонкой очистки;</li>
        <li>линия всасывания пенообразователя;</li>
        <li>трехходовой кран;</li>
        <li>линия нагнетания пенообразователя в воду.</li>
      </ul>
      <h3>К основным преимуществам дозатора турбинного осевого относятся:</h3>
      <ul>
        <li>
          точность дозирования (насос для подачи воды расположен на той же линии
          с двумя валами, что и водяной двигатель (турбина), и вращается с той
          же скоростью).
        </li>
        <li>
          простота в дизайне - делает его идеальной технологией дозирования для
          систем с переменным расходом.
        </li>
        <li>
          возможность промывки и испытания - на всасывающем трубопроводе линии
          подачи пены установлен трехходовой клапан. При обычном использовании,
          наличие трехходового крана,позволяет насосу пены забирать пену из
          соответствующего резервуара, но также его можно настроить для изоляции
          резервуара и обеспечить доступ воды из входного отверстия тем самым
          позволяя промывать или тестировать дозатор.
        </li>
        <li>
          легкость монтажа – данное устройство может быть установлено в любом
          положении в горизонтальных или вертикальных системах трубопроводов и
          может быть подключены к любому типу резервуара для хранения пены.
        </li>
        <li>
          современные технологии – для дозатора используется гибкий, устойчивый
          к истиранию материал лопасти, который предает агрегату уникальные
          характеристики износа.
        </li>
      </ul>
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
.technical-description {
  width: 100%;
  padding: 32px 0px;
  padding-bottom: 64px;
  background: $color-black-100;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;

    p {
      @include size-body-text;
      color: $color-white-88;
    }

    ul,
    ol {
      padding-left: 20px;

      li {
        @include size-body-tiny-text;
        color: $color-white-88;

        & + li {
          margin-top: 8px;
        }
      }
    }

    h2 {
      @include size-h2;
      color: $color-white-100;
    }

    h3 {
      @include size-h3-regular;
      color: $color-white-100;
    }

    img {
      display: block;
      margin: 32px auto;
    }
  }

  @media (max-width: 768px) {
    padding: 16px 0px 32px;

    &__container {
      h2 {
        @include size-h2-small;
        color: $color-white-100;
      }
      img {
        width: 100%;
      }
    }
  }
}
</style>
