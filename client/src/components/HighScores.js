import React from 'react'
import '../App.css'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';


const HighScores = () => {

    const [numberOfScores, setNumberOfScores] = useState(10);
    const [highScores, setHighScores] = useState([]);

    
  const PORT = 5000;
  const baseURL = "http://localhost";

  //use effect to get high scores
    useEffect(() => {
        axios.get(`${baseURL}:${PORT}/highscores${numberOfScores}`)
        .then(res => {
            setHighScores(res.data);
        }
        )
        .catch(err => {
            console.log(err);
        }
        )
    }, [numberOfScores]);




  return (
    <div>
        <h1>High Scores</h1>
        <div>
            <label>Number of scores:</label>
            <input type="number" value={numberOfScores} onChange={(e) => setNumberOfScores(e.target.value)} />
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