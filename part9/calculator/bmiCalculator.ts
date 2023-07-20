//arg and validation
interface BMIValues {
    value1: number;
    value2: number;
}
  
const parseArguments = (args: string[]): BMIValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };


const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / (height * height);

    switch (true) {
        case bmi <= 18.4:
            return "Underweight (unhealthy weight)";
        case bmi <= 24.9:
            return "Normal (healthy weight)";
        case bmi <= 29.9:
            return "Overweight (unhealthy weight)";
        case bmi >= 30:
            return "Obese (unhealthy weight)";
        default:
            throw new Error('Invalid height or weight');
    }
};

try {
    const { value1, value2 } = parseArguments(process.argv);
    console.log(calculateBmi(value1, value2));
} 
catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';

    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}


export default calculateBmi;