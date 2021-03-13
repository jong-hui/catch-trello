import { configure } from 'mobx'
import { Provider, MobXProviderContext } from 'mobx-react'
import React from 'react'
import { AppStore } from './AppStore/AppStore'
import { TrelloStore } from './TrelloStore/TrelloStore'

configure({ enforceActions: "never" })

const Stores = {
  appStore: new AppStore(),
  trelloStore: new TrelloStore()
}

function useStores () {
  return React.useContext(MobXProviderContext) as typeof Stores
}

export { Provider, Stores, useStores }