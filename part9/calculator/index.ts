import express from 'express';
//import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import {isNotNumber} from './utils';

const app = express();

/** 
 * app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
  
    if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
      res.status(400).json({ error: 'malformatted parameters' });
      return;
    }
  
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi: bmi
    });
  });

*/


app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment 
    const { daily_exercises, target } = req.body;
  
    if ( !target || !daily_exercises ) {
      return res.send({ error: "parameters missing" });
    }
  
    if ( isNotNumber(target) ) {
      return res.send({ error: "malformatted parameters" });
    }
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const days = daily_exercises as any[];
  
    for (const day of days) {
      if ( isNotNumber(day)) {
        return res.send({ error: "malformatted parameters" });
      }
    }
  
    const response = calculateExercises(days.map(d => Number(d)), Number(target));
  
    return res.send(response);
  });
  

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});