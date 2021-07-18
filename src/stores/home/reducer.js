
import { Types, } from './actions';


const initState = {
  DataHistory: [],
  DataNews: [],
};

export default function homeReducer(state = initState, action) {
  switch (action.type) {

    case Types.UPDATE_DATA:
      if (state.DataHistory != null) {
        
        return {

          ...state,
          DataHistory: [action.payload, ...state.DataHistory,],

        };
      }
      else {
        return {

          ...state,
          DataHistory: [action.payload,],

        };
      }

    case Types.CLEAR_DATA:
      return {

        ...state,
        DataHistory: [],

      };
    default:
      return state;
  }
}
