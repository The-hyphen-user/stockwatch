import React from 'react'
import '../App.css'

const Stock = ({symbol, quantity }) => {
  return (
    <div className='center'>
    <div className='stock'>
        
        <h3>{symbol}{' '}{quantity}</h3>
    </div>
    </div>
  )
}

export default Stock