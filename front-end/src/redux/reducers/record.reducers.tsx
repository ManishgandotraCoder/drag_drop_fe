import { recordTypes } from "../constants/record.types";

type reducers = {
  type: string;
  payload: any;
};
const initialState = {
  records: {},
  recordsList: [],
  currentId: "",
};
const recordReducers = (state = initialState, action: reducers) => {
  switch (action.type) {
    case recordTypes.GET_RECORDS:
      return {
        ...state,
        recordsList: action.payload.arr,
        currentId: action.payload.id,
      };
    case recordTypes.UPDATE_RECORDS:
      return {
        ...state,
        records: action.payload,
      };
    default:
      return state;
  }
};
export default recordReducers;
