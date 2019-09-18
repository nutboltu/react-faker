export const mapInitialFakeApis = (apis) => {
  if (!Array.isArray(apis)) {
    return {};
  }
  return apis.reduce((acc, cur) => {
    acc[cur.url] = cur;
    return acc;
  }, {});
}