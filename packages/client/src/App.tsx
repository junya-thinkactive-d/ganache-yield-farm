import { createSignal } from 'solid-js'
import type { Component } from 'solid-js'

import HelloSolidJS from './components/HelloSolidJS'
import Navber from './components/Navber'

const App: Component = () => {
  const [account, setAccount] = createSignal<string>('0x0')
  return (
    <>
      <Navber acount={account()} />
      <HelloSolidJS />
    </>
  )
}

export default App
