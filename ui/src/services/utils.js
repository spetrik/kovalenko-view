export function handleResponse(response) {
  return response.text().then(text => {
    const isJson = response.headers.get('content-type').indexOf('application/json') !== -1;
    const data = isJson ? JSON.parse(text) : text;
    if (!response.ok) {
      const error = response.statusText + ': ' + (data || '');
      return Promise.reject(error);
    }
    return data;
  });
}