import { LiftingDay } from "@/tendec/lib/types/types";

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

export const extractEstimatedMaxFromLiftingDays = (liftingDays: LiftingDay[], exerciseName: string, maxEstimationFunction?: OneRepEstimateFunction): EstimatedMaxData[] => {
  const estimatedMaxExercises: EstimatedMaxData[] = [];

  const MIN_WEIGHT = -999;
  for(const liftingDay of liftingDays) {
    let maxEstimatedSoFar = MIN_WEIGHT;
    const exercisesForDay = liftingDay.lifts.filter(lift => lift.exerciseName === exerciseName);
    const setsOfExerciseForDay = exercisesForDay.flatMap(a => a.sets);
    for (const set of setsOfExerciseForDay) {
      const { liftedWeight, repetitions } = set;

      const estimatedMaxFromSet = getEstimatedMax({
        estimationFunction: maxEstimationFunction,
        liftedWeight,
        repetitions
      });
      if (estimatedMaxFromSet > maxEstimatedSoFar) {
        maxEstimatedSoFar = estimatedMaxFromSet;
      }
    }
    if (maxEstimatedSoFar !== MIN_WEIGHT) {
      estimatedMaxExercises.push({
        weight: maxEstimatedSoFar,
        date: liftingDay.date
      });
    }
  }
  return estimatedMaxExercises;
}

export interface EstimatedMaxData {
  weight: number,
  date: string
}

const estimatedOneRepMaxWithBrzycki = ({
  liftedWeight,
  repetitions
}: EstimatedMaxArgs) => {
  return liftedWeight * ( 36 / ( 37 - repetitions));
}

const estimatedOneRepMaxWithEpley = ({
  liftedWeight,
  repetitions
}: EstimatedMaxArgs) => {
  if (repetitions === 1) {
    return liftedWeight;
  }
  return liftedWeight * ( 1 + ( repetitions / 30));
}

interface EstimatedMaxArgs {
  liftedWeight: number,
  repetitions: number
}
interface GetEstimatedMax extends EstimatedMaxArgs {
  estimationFunction?: OneRepEstimateFunction
}
const getEstimatedMax = ({
  estimationFunction = "Brzycki",
  liftedWeight,
  repetitions
}: GetEstimatedMax): number => {
  let estimatedOneRep;
  if (estimationFunction === "Brzycki") {
    estimatedOneRep = estimatedOneRepMaxWithBrzycki({
      liftedWeight,
      repetitions
    })
  } else if (estimationFunction === "Epley") {
    estimatedOneRep = estimatedOneRepMaxWithEpley({
      liftedWeight,
      repetitions
    });
  }

  if (estimatedOneRep === undefined) {
    throw new Error(`Unknown one rep max estimated function ${estimationFunction}`);
  }

  return Math.round(estimatedOneRep);
}