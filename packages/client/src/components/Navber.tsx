import type { Component } from 'solid-js'

type Props = {
  acount: string
}

const Navber: Component<Props> = (props) => {
  return (
    <div>
      <h2>Navber {props.acount}</h2>
    </div>
  )
}

export default Navber
