import {sign} from 'jsonwebtoken';


export const createJwtToken = (payload: any): string => {
  return sign(payload, "sjkafnkjanfkjasfkasnfjn");
};