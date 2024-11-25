import { GetBodyWeightDataResponse, liftingDayToBodyWeightData } from '@/tendec/lib/backend/actions/types/body-weight';
import { getStructuredData } from '@/tendec/lib/db/get-data';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetBodyWeightDataResponse>
) {
  if (req.method !== "GET") {
    res.status(400);
    return;
  }

  const structuredLiftingData = await getStructuredData();
  const bodyWeightData = structuredLiftingData.map(liftingDay => liftingDayToBodyWeightData(liftingDay));
  res.status(200).json(bodyWeightData);
}