export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const UseFetch = async (
    url: string,
    method: Method,
    body?: string | FormData,
    tags?: string[]
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
              },
              next: {
                  tags: tags
              }
          });
};
