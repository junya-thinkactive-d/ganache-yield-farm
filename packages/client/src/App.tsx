import type { Component } from 'solid-js'
import HelloSolidJS from './components/HelloSolidJS'

const App: Component = () => {
  return (
    <div class='w-full h-screen flex justify-center items-center'>
      <HelloSolidJS />
    </div>
  )
}

export default App
