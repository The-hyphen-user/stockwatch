import React from 'react'

const StockCard = ({symbol, details, selectedCard}) => {

    const selected = () => {
        console.log("selected: ", symbol);
        selectedCard(symbol, details);
    }
    
  return (
    <div className="stock-card">
    <div className='stock-card-container'>
        <button className='stock-card-button' onClick={selected}>
        <h1>{symbol}</h1>
        <h2>{details.description}</h2>
        {details.price ? 
        <h3>{details.price}</h3>
        :
        <div/>
        }
        </button>
    </div>
    </div>
  )
}

export default StockCard