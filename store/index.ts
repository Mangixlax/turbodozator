import { GetterTree, ActionTree, MutationTree, ActionContext } from 'vuex/types'

/**
 * States
 */
export const state = () => ({
  breadcrumbs: [] as Array<object>,
  isMobileMenuOpen: false as boolean,
  main: { }
})

export type RootState = ReturnType<typeof state>

/**
 * Action context specific to settings top line module
 */
interface RootActionContext extends ActionContext<RootState, RootState> {}

/**
 * Getters
 */
export const getters: GetterTree<RootState, RootState> = {
  getBreadcrumbs(state: RootState) {
    return state.breadcrumbs || []
  },
  isMobileMenuOpen(state: RootState) {
    return state.isMobileMenuOpen
  },
}

/**
 * Mutations
 */
export const mutations: MutationTree<RootState> = {
  setBreadcrumbs(state, list = []) {
    state.breadcrumbs = list
  },
  setMobileMenu(state: RootState, value: boolean) {
    state.isMobileMenuOpen = value
  },
  setMainData(state: RootState, value: Object) {
    state.main = value
  }
}

/**
 * Actions
 */
export const actions: ActionTree<RootState, RootState> = {
  // nuxtServerInit({ dispatch }: RootActionContext, {}) {
  //   return Promise.all([dispatch('fetchMainData')])
  // },
  // fetchMainData({
  //   commit,
  //   dispatch,
  // }: RootActionContext): Promise< any> {
  //   return new Promise((resolve) => {
  //     this.$axios
  //       .$get(`/wp-json`)
  //       .then(async (data: any) => { // @TODO TBD
  //         commit('setMainData', data)
  //         resolve(data)
  //       })
  //       .catch(() => resolve(null))
  //   })
  // },
}
