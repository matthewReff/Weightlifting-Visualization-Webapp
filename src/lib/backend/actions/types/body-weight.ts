import { LiftingDay } from "@/tendec/lib/types/types";

export interface BodyWeightData {
  bodyWeight: number,
  date: string
}

export type GetBodyWeightDataResponse = BodyWeightData[];

export const liftingDayToBodyWeightData = (liftingDay: LiftingDay): BodyWeightData => {
  return {
      bodyWeight: liftingDay.bodyWeight,
      date: liftingDay.date
  }
}
