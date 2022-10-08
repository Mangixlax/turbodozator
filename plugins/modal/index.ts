import { Vue } from 'nuxt-property-decorator'
import { modalPlugin } from '~/plugins/modal/Plugin'
import { ModalOptions } from '~/plugins/modal/types'

Vue.use<ModalOptions>(modalPlugin)
