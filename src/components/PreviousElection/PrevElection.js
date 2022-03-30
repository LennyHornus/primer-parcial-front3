import React, { Component } from 'react'

export class PrevElection extends Component {
  render() {
    return (
      <div className='recordatorio'>
          <h2>Seleccion anterior: {this.props.lastAnswer}</h2>
          <h2>Historial de opciones elegidas:</h2>
          <ul>
            {this.props.prevElections.map((eleccion, i)=>{
              return <li key={i}> {eleccion} </li>
            })}
          </ul>
      </div>
    )
  }
}

export default PrevElection;