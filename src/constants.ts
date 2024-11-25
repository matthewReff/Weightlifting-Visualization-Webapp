// TODO: Export colors for graphing lib until we can load dynamically
export const PRIMARY_COLOR = "#F3F6F7";
export const SECONDARY_COLOR = "#212F3C";
export const BACKGROUND_COLOR_900 = "#0C1722";
export const BACKGROUND_COLOR_800 = "#242E38";
export const BACKGROUND_COLOR_700 = "#3C454E"
export const BACKGROUND_COLOR_600 = "#545C64"

const IS_DEPLOYED = !!process.env.NEXT_PUBLIC_VERCEL_ENV;

const LOCAL_APP_URL = "http://localhost:3000";
const VERCEL_APP_URL = `${process.env.NEXT_PUBLIC_VERCEL_URL}`;
export const BASE_APP_URL = IS_DEPLOYED ? VERCEL_APP_URL : LOCAL_APP_URL;
export const BASE_API_URL = "";