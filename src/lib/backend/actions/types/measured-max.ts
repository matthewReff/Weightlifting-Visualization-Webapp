export interface MeasuredMaxData {
  weight: number,
  repetitions: number,
  date: string
}

export interface GetMeasuredMaxQueryParams extends Record<string, string>{
  exerciseName: string
}
export type GetMeasuredMaxResponse = MeasuredMaxData[];