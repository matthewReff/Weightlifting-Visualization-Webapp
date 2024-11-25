import { extractMeasuredMaxFromLiftingDays, GetMeasuredMaxResponse } from '@/tendec/lib/backend/actions/types/measured-max';
import { getStructuredData } from '@/tendec/lib/db/get-data';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetMeasuredMaxResponse>
) {
  if (req.method !== "GET") {
    res.status(400);
    return;
  }

  const { exerciseName } = req.query;
  if (!exerciseName) {
    res.status(400);
    return;
  }

  const structuredLiftingData = await getStructuredData();
  const exerciseMaxData = extractMeasuredMaxFromLiftingDays(structuredLiftingData, exerciseName as string);

  res.status(200).json(exerciseMaxData);
}