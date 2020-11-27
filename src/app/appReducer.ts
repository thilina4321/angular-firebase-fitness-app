import { InitialState } from '@ngrx/store/src/models';

export interface State{
  isLoading:boolean
}

const initialState = {
  isLoading : false
}

export function appReducer(state = initialState, action: any){
  switch(action.type){
    case 'START' : return {isLoading : true}
    case 'STOP' : return {isLoading : false}
    default : return state
  }
}
