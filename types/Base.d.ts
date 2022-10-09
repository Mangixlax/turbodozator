import { Location } from 'vue-router/types/router'
import { Commit, Dispatch } from 'vuex'

export interface IHeaderMenuItem {
  label: string
  route: string | Location
  columns?: IHeaderMenuColumn[]
}

export interface IHeaderMenuColumn {
  title?: string
  links: IFastLink[]
}

export interface IHeaderMobileMenuItem {
  label: string
  iconColor: string
  type: string
  icon: string
  route: string | Location
  columns?: IHeaderMenuColumn[]
}

export interface IFastLink {
  label: string
  route: string | Location
}

export interface IFastLinkList {
  title?: string
  links: IFastLink[]
}

export interface IFilterLinkList {
  title: string
  links: IFilterLink[]
}

export interface IFilterLink {
  label: string
  route: IRoute
}

export interface IRoute {
  name: string
  query: object
}

export interface IIcon {
  name: string
  href: string
  title: string
}

export interface IHeaderFooterLink {
  label: string
  route: Location
  class?: string
  icon?: string
  iconColor?: string
}

export interface ActionContext<S, RS, G = any, RG = any> {
  dispatch: Dispatch
  commit: Commit
  state: S
  getters: G
  rootState: RS
  rootGetters: RG
}
