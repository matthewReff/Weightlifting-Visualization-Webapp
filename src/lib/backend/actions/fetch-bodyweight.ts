import { BASE_API_URL } from "@/tendec/constants"
import { getDebugInfoFromResponse } from "@/tendec/lib/debug-utils";
import { GetBodyWeightDataResponse } from "./types/body-weight";

export const fetchBodyweightData = async () => {
    const bodyWeightResponse = await fetch(`${BASE_API_URL}/data/body-weight`);
    if (!bodyWeightResponse.ok) {
        const debugInfo = getDebugInfoFromResponse(bodyWeightResponse);
        throw new Error("Failed to fetch body weight response " + debugInfo);
    }

    const bodyWeightData = await bodyWeightResponse.json() as GetBodyWeightDataResponse;
    return bodyWeightData;
}