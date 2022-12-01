import React from "react";
import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const HighScores = () => {
  const [numberOfScores, setNumberOfScores] = useState(10);
  const [highScores, setHighScores] = useState([]);
  const [whenToUpdate, setWhenToUpdate] = useState(true);

  const PORT = 5000;
  const baseURL = "http://localhost";

  //use effect to get high scores

  useEffect(() => {
    getHighScores(numberOfScores);
  }, []);

  const getHighScores = () => {
    console.log("getting high scores", numberOfScores);
    const num = numberOfScores;
    console.log("num: ", num);
    axios
      .get(`${baseURL}:${PORT}/highscores${num}`)
      .then((res) => {
        setHighScores(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>High Scores</h1>
      <div className="table-container">
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, maxWidth: 800, borderRadius: 2 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {highScores.map((row) => (
                <TableRow key={row.name} sx={{ p: 20 }}>
                  <TableCell align="center">{row.username}</TableCell>
                  <TableCell align="center">{row.wealth}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div></div>
    </div>
  );
};

export default HighScores;

/**
 * 
 * 
            <label>Number of scores:</label>
            <input type="number" value={numberOfScores} onChange={(e) => setNumberOfScores(e.target.value)} />
            <button onClick={() => getHighScores()}>Update</button>
 */

/**
 * 
 * <div>
            {highScores.map((score, i) => {
                return <div key={i}> {score.username} - {score.wealth}</div>
            }
            )}
        </div>
 * 
 */
