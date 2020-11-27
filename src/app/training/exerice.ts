export interface Exerice {

  id:string;
  userId?:string;
  role?: '';
  name:string;
  duration:number;
  calories:number;
  date?:Date
  state?: 'completed'|'canceled'| null

}
