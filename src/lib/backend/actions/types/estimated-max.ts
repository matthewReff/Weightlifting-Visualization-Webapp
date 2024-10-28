export interface EstimatedMaxData {
  weight: number,
  date: string
}

export type OneRepEstimateFunction = "Brzycki" | "Epley";


export interface GetEstimatedMaxQueryParams extends Record<string, string>{
  exerciseName: string,
  maxEstimationFunction: OneRepEstimateFunction
}
export type GetEstimatedMaxResponse = EstimatedMaxData[];