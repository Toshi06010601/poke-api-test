// Store data in local storage
export const cacheApiResponseInLocal = (data, key) => {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get data from local storage
export const retrieveApiResponseFromLocal = (key) => {
  const ApiResponse = localStorage.getItem(key);
  return JSON.parse(ApiResponse);
}