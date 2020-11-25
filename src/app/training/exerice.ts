export interface Exerice {

  id:string;
  name:string;
  duration:number;
  calories:number;
  date?:Date
  state?: 'completed'|'canceled'| null

}
