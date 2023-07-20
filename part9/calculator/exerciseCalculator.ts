export interface ExercisesValues {
    target: number;
    daily_exercises: number[];
  }
  
  const Arguments = (args: string[]): ExercisesValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    const hours = args.slice(3).map(Number);
    if (!isNaN(Number(args[2])) && !(hours.some(value => isNaN(value)))) {
      return {
        target: Number(args[2]),
        daily_exercises: hours
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  


const calculateExercises = (daily_hours: Array<number>, target: number): object => {
    const periodLength = daily_hours.length;
    const trainingDays = daily_hours.filter(hour => hour !== 0).length;
    const average = daily_hours.reduce((total, hour) => total + hour, 0) / trainingDays;
    const success = average >= target;
    
    let rating = 0;
    let ratingDescription = '';
    
    switch (true) {
        case average <= target:
          rating = 1;
          ratingDescription = 'super bad';
          break;
        case average > target && average <= (2/3) * target:
          rating = 2;
          ratingDescription = 'not too bad but could be better';
          break;
        case average > (2/3) * target:
          rating = 3;
          ratingDescription = 'good';
          break;
      }
      
    
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average
    };
  };
  
  try {
    const { target, daily_exercises } = Arguments(process.argv);
    console.log(calculateExercises(daily_exercises, target));
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    console.log(errorMessage);
  }
  
export default calculateExercises;