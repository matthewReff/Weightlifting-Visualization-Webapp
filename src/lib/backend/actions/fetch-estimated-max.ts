import { BASE_API_URL } from "@/tendec/constants";
import { getDebugInfoFromResponse } from "../../debug-utils"
import { GetEstimatedMaxQueryParams, GetEstimatedMaxResponse, OneRepEstimateFunction } from "./types/estimated-max";

export const fetchEstimatedMax = async (exerciseName: string, maxEstimationFunction: OneRepEstimateFunction) => {
  const queryParams: GetEstimatedMaxQueryParams = {
    exerciseName: exerciseName,
    maxEstimationFunction: maxEstimationFunction,
  }
  const searchParams = new URLSearchParams(queryParams);
  const estimatedMaxResponse = await fetch(`${BASE_API_URL}/api/data/estimated-max?` + searchParams);
  if (!estimatedMaxResponse.ok) {
    const debugInfo = getDebugInfoFromResponse(estimatedMaxResponse);
    throw new Error("Failed to fetch estimated 1 rep max response " + debugInfo);
  }

  const estimatedMaxInfo = await estimatedMaxResponse.json() as GetEstimatedMaxResponse;
  return estimatedMaxInfo;
}