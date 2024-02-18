
// Return ID from URI
export function ReturnIDfromUri(uri) {
  const id = uri.split('/').pop();
  return id;
}
