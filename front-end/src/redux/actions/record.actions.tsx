import { getRecordsAPI, updateRecordsAPI } from "../apis/record.apis";
import { recordTypes } from "../constants/record.types";

export const getRecords = async () => {
  const response: any = await getRecordsAPI();

  return {
    type: recordTypes.GET_RECORDS,
    payload: response?.data,
  };
};

export const updateRecords = async (params: any, currentId: any) => {
  const response: any = await updateRecordsAPI(params, currentId);

  return {
    type: recordTypes.UPDATE_RECORDS,
    payload: response?.data,
  };
};
