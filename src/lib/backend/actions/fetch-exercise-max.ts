import { BASE_API_URL } from "@/tendec/constants";
import { getDebugInfoFromResponse } from "../../api-utils"
import { GetMeasuredMaxQueryParams, GetMeasuredMaxResponse } from "./types/measured-max";

export const fetchMeasuredMax = async (exerciseName: string) => {
  const queryParams: GetMeasuredMaxQueryParams = {
    exerciseName: exerciseName,
  }
  const searchParams = new URLSearchParams(queryParams);
  const exerciseMaxResponse = await fetch(`${BASE_API_URL}/data/exercise-max?` + searchParams);
  if (!exerciseMaxResponse.ok) {
    const debugInfo = getDebugInfoFromResponse(exerciseMaxResponse);
    throw new Error("Failed to fetch body weight response " + debugInfo);
  }

  const exerciseMaxInfo = await exerciseMaxResponse.json() as GetMeasuredMaxResponse;
  return exerciseMaxInfo;
}