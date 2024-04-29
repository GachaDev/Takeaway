export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const useFetch = async (
    url: string,
    method: Method,
    body?: string | FormData
): Promise<Response> => {
    return method == 'POST' || method == 'PUT'
        ? fetch('http://localhost:4000' + url, {
              method,
              headers: {
                  'Content-Type': 'application/json'
              },
              body
          })
        : fetch('http://localhost:4000' + url, {
              method,
              headers: {
                  'Content-Type': 'application/json'
              }
          });
};
