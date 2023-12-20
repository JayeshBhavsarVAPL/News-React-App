import React, { Component } from 'react'
import img from './loading.gif'

export default class Spin extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={img} alt="loading" style={{width: "50px"}} />
      </div>
    )
  }
}
