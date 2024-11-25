import { spreadsheetEntriesToLiftingDays } from "../types/conversion";
import { LiftingDay, SpreadsheetEntry } from "../types/types";
import { loadData } from "./load-data";

let data: SpreadsheetEntry[];
export const getData = async () => {
  if (data) {
    return data;
  } else {
    data = await loadData();
    return data;
  }
}

let structuredData: LiftingDay[];
export const getStructuredData = async () => {
  if (structuredData) {
    return structuredData;
  } else {
    data = await loadData();
    return spreadsheetEntriesToLiftingDays(data);
  }
}