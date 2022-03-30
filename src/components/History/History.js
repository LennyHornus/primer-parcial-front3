import React, { Component } from 'react'

export class History extends Component {
  render() {
    return (
      <h1 className='historia'>{this.props.text}</h1>
    )
  }
}

export default History