import React from 'react'
//import css
import '../App.css'

const StockButton = ({symbol, description}) => {
  return (
    <div className='stock-button'>
    <h3>{symbol}</h3>
    <h4>{description}</h4>
    </div>
  )
}

export default StockButton;