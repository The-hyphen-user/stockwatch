import React from 'react'
import Stock from "./Stock";
import StockButton from './StockButton';
import { useState, useEffect } from 'react';

const SearchResults = ({ selectedStock, results }) => {
  //const [results, setResults] = useState([]);
  const [shownResults, setShownResults] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const select = (e, symbol) => {
    e.preventDefault();    
    selectedStock(symbol);
  }
  useEffect(() => {
    setPageNumber(1)
    if (results.length >= 10) {
    setShownResults(results.slice(0, 10));//
    } else {
      setShownResults(results);
    }
    console.log('results length', results.length);
  
    
    console.log('pageNumber', pageNumber);
  }, [results])


  const showPreviousResults = () => {
    if (pageNumber > 1) {
      setShownResults(results.slice((pageNumber - 1) * 10, pageNumber * 10));
      setPageNumber(pageNumber - 1);
    } else {
      console.log('no previous results');
    }
    console.log('pageNumber', pageNumber);
  }
  
  const showNextResults = () => {
    if (results.length >= (pageNumber + 1) * 10) {
      setShownResults(results.slice(pageNumber * 10, (pageNumber + 1) * 10));
      setPageNumber(pageNumber + 1);
    } else if (results.length > pageNumber * 10 && results.length < (pageNumber + 1) * 10) {
      setShownResults(pageNumber * 10, results.length);
      setPageNumber(pageNumber + 1);
    } else {
      console.log("no more results")
    }
    console.log('pageNumber', pageNumber);
  }

  return (
    <>
    <div>Search</div>
    <div className='search-container'>
        {shownResults ? (

          <div className='search-results'>
            {shownResults.map((stock, i) => 
            <button key={i} onClick={e => select(e, stock.symbol)}>
            <StockButton symbol ={stock.symbol}
            description={stock.description}/>
            </button>
            )}
          </div>          
        ) : null}
        {}
        <div>
        <button onClick={() => showPreviousResults()}>{'<'}</button>
        </div>
        <div>
        <button onClick={() => showNextResults()}>{'>'}</button>

        </div>
    </div>
    </>
  )
}

export default SearchResults