import { setAGreaterThanB } from "@/tendec/lib/types/type-functions";
import { LiftingDay } from "@/tendec/lib/types/types";
import { Set } from "@/tendec/lib/types/types"

export interface MeasuredMaxData {
  weight: number,
  repetitions: number,
  date: string
}

export interface GetMeasuredMaxQueryParams extends Record<string, string>{
  exerciseName: string
}
export type GetMeasuredMaxResponse = MeasuredMaxData[];

export const extractMeasuredMaxFromLiftingDays = (liftingDays: LiftingDay[], exerciseName: string): MeasuredMaxData[] => {
  const rollingMaxExercises: MeasuredMaxData[] = [];

  const MIN_WEIGHT = -999;
  let maxSetSoFar: Set = {
    liftedWeight: MIN_WEIGHT,
    repetitions: 0
  }
  for(const liftingDay of liftingDays) {
    const exercisesForDay = liftingDay.lifts.filter(lift => lift.exerciseName === exerciseName);
    const setsOfExerciseForDay = exercisesForDay.flatMap(a => a.sets);
    for (const set of setsOfExerciseForDay) {
      if (setAGreaterThanB(set, maxSetSoFar)) {
        maxSetSoFar = set;
      }
    }
    if (maxSetSoFar.liftedWeight !== MIN_WEIGHT) {
      rollingMaxExercises.push({
        weight: maxSetSoFar.liftedWeight,
        repetitions: maxSetSoFar.repetitions,
        date: liftingDay.date
      });
    }
  }
  return rollingMaxExercises;
}