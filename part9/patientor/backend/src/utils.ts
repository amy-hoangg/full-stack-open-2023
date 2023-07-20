import { NewPatient, Gender, EntryWithoutId, Diagnosis } from "./types";

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string' || value instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (value: string): value is Gender => {
  return Object.values(Gender)
  .map(v => v.toString())
  .includes(value);
};

const parseString = (value: unknown, what: string): string => {
  if ( isString(value)) {
    return value;
  }
  throw new Error(`Value of ${what} incorrect: ${value}`);
};

const parseDate = (value: unknown, what: string): string => {
  if (!isString(value) || !isDate(value)) {
      throw new Error(`Value of ${what} incorrect: ${value}`);
  }
  return value;
};

const parseGender = (value: unknown): Gender => {
  if (!isString(value) || !isGender(value)) {
      throw new Error(`Value of gender incorrect: ${value}`);
  }
  return value;
};

const parseHealtCheckRating = (value: unknown, what: string): 0 | 1 | 2 | 3 => {
  if ( isNumber(value) 
  && ( value === 0 || value === 1 || value === 2 || value === 3 ) ) {
    return value;
  }
  throw new Error(`Value of ${what} incorrect: ${value}`);
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  //entries o day la object param
  if (!object 
    || typeof object !== 'object' 
    || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

type DischargeType = {
  date: string;
  criteria: string;
};

const parseDischarge = (object: unknown): DischargeType | undefined =>  {
  if (!object 
    || typeof object !== 'object' 
    || !('discharge' in object)) {
    return undefined;
  }

  const discharge = object.discharge;

  if ( !discharge 
    || typeof discharge !== 'object' ) 
    throw new Error('invalid discharge');

  if ( !('date' in discharge) 
  || !isString(discharge.date) 
  || !isDate(discharge.date))  {
    throw new Error('discharge date missing or wrong type');
  }
    
  if ( !('criteria' in discharge) 
  || !isString(discharge.criteria)) {
    throw new Error('discharge criteria missing or wrong type');
  }

  return {
    date: discharge.date,
    criteria: discharge.criteria
  };
};

type SickLeaveType = {
  startDate: string;
  endDate: string;
};

const parseSickLeave = (object: unknown): SickLeaveType | undefined =>  {
  if (!object 
    || typeof object !== 'object' 
    || !('sickLeave' in object)) {
    return undefined;
  }

  const sickLeave = object.sickLeave;

  if ( !sickLeave 
    || typeof sickLeave !== 'object' ) 
    throw new Error('invalid sickLeave');

  if ( !('startDate' in sickLeave) 
  || !isString(sickLeave.startDate) 
  || !isDate(sickLeave.startDate))  {
    throw new Error('sickLeave startDate missing or wrong type');
  }

  if ( !('endDate' in sickLeave) 
  || !isString(sickLeave.endDate) 
  || !isDate(sickLeave.endDate))  {
    throw new Error('sickLeave endDate missing or wrong type');
  }

  return {
    startDate: sickLeave.startDate,
    endDate: sickLeave.endDate
  };
};

export const parsePatient = (object: unknown): NewPatient=> {
  if (!object 
    || typeof object !== 'object') {
    throw new Error('Data missing or in wrong format');
  }

  if ( !('name' in object)) throw new Error('name missing');
  if ( !('occupation' in object)) throw new Error('occupation missing');
  if ( !('ssn' in object)) throw new Error('ssn missing');
  if ( !('gender' in object)) throw new Error('gender missing');
  if ( !('dateOfBirth' in object)) throw new Error('dateOfBirth missing');

  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth, 'dateOfBirth'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    ssn: parseString(object.ssn, 'occupation'),
    entries: []
  };
};

export const parseEntry = (object: unknown): EntryWithoutId => {
  if (!object 
    || typeof object !== 'object') {
    throw new Error('Data missing or in wrong format');
  }

  if ( !('type' in object)) throw new Error('type missing');
  if ( !('date' in object)) throw new Error('date missing');
  if ( !('specialist' in object)) throw new Error('specialist missing');
  if ( !('description' in object)) throw new Error('description missing');

  const common = {
    date: parseDate(object.date, 'date'),
    specialist: parseString(object.specialist, 'specialist'),
    description: parseString(object.description, 'description'),
    diagnosisCodes: parseDiagnosisCodes(object)
  };

  if ( object.type === 'HealthCheck') {
    if ( !('healthCheckRating' in object)) throw new Error('healthCheckRating missing');
    return {
      ...common,
      type: 'HealthCheck',
      healthCheckRating: parseHealtCheckRating(object.healthCheckRating, 'healthCheckRating'),
    };
  } 
  
  else if ( object.type === 'OccupationalHealthcare') {
    if ( !('employerName' in object)) throw new Error('employerName missing');
    return {
      ...common,
      type: 'OccupationalHealthcare',
      employerName: parseString(object.employerName, 'employerName'),
      sickLeave: parseSickLeave(object)
    };
  } 


  else if ( object.type === 'Hospital') {
    return {
      ...common,
      type: 'Hospital',
      discharge: parseDischarge(object)
    };
  } 

  throw new Error(`Incorrect type: ${object.type}`);
  //nay la else a, nghia la khong thuoc cai type nao nhu tren ca
};