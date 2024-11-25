import { extractEstimatedMaxFromLiftingDays, GetEstimatedMaxResponse, OneRepEstimateFunction } from '@/tendec/lib/backend/actions/types/estimated-max';
import { getStructuredData } from '@/tendec/lib/db/get-data';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetEstimatedMaxResponse>
) {
  if (req.method !== "GET") {
    res.status(400);
    return;
  }

  const { exerciseName, maxEstimationFunction } = req.query;
  if (!exerciseName || !maxEstimationFunction) {
    res.status(400);
    return;
  }


  const structuredLiftingData = await getStructuredData();
  const estimatedMaxData = extractEstimatedMaxFromLiftingDays(structuredLiftingData, exerciseName as string, maxEstimationFunction as OneRepEstimateFunction);

  res.status(200).json(estimatedMaxData);
}