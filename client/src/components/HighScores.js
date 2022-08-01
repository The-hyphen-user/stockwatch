import React from 'react'
import '../App.css'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';


const HighScores = () => {

    const [numberOfScores, setNumberOfScores] = useState(10);
    const [highScores, setHighScores] = useState([]);
    const [whenToUpdate, setWhenToUpdate] = useState(true);

    
  const PORT = 5000;
  const baseURL = "http://localhost";

  //use effect to get high scores

    useEffect(() => {
        getHighScores(numberOfScores)
    }, []);



    const getHighScores = () => {
        console.log('getting high scores', numberOfScores)
        const num = numberOfScores;
        console.log('num: ', num)
            axios.get(`${baseURL}:${PORT}/highscores${num}`)
        .then(res => {
            setHighScores(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    // function wait(msec) {
    //     return new Promise(res => {setTimeout(()=>{res()}, msec)})
    //   }

    // const waitASecond =  (num) => {
    //     setNumberOfScores(num);
    //     if(whenToUpdate){
    //     setWhenToUpdate(false);
    //     setTimeout(() => {
    //     updateScores();
    //     setWhenToUpdate(true);
    //     }, 1000);
    //     }
    // }

    // const updateScores = () => {
    //     getHighScores();
    // }








  return (
    <div>
        <h1>High Scores</h1>
        <div>
            <label>Number of scores:</label>
            <input type="number" value={numberOfScores} onChange={(e) => setNumberOfScores(e.target.value)} />
            <button onClick={() => getHighScores()}>Update</button>
        </div>

        <div>
            {highScores.map((score, i) => {
                return <div key={i}> {score.username} - {score.wealth}</div>
            }
            )}
        </div>
    </div>
    )
}


export default HighScores