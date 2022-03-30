import React, { Component } from 'react'

export class Options extends Component {
  render() {
    return (
        <div className='opciones'>
            <div className='opcion'>
                <button className='botones' onClick={this.props.handler} value='A'>A</button>
                <h3>{this.props.options.a}</h3>
            </div>

            <div className='opcion'>
                <button className='botones' onClick={this.props.handler} value='B'>B</button>
                <h3>{this.props.options.b}</h3>
            </div>
        </div>
    )
  }
}

export default Options;