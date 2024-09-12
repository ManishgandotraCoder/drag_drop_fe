import _helperaxios from "../../helper/axios";

function getRecordsAPI() {
  return _helperaxios(`/record`, null, "GET");
}
const updateRecordsAPI = (record: any, currentId: number) => {
  return _helperaxios(`/record/${currentId}`, { arr: record }, "PUT");
};
export { getRecordsAPI, updateRecordsAPI };
