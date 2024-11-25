export const getDebugInfoFromResponse = async (responseToDebug: Response): Promise<string> => {
  const statusCode = responseToDebug.status;
  const statusText = responseToDebug.statusText;
  const responseText = await responseToDebug.text();
  const debugInfo = `${statusCode} - ${statusText} - ${responseText}`;
    
  return debugInfo;
}