import { useState, useCallback } from 'react';

const identURL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const dbURL = 'https://react-http-308cb-default-rtdb.firebaseio.com';
const uploadURL =
  'https://firebasestorage.googleapis.com/v0/b/react-http-308cb.appspot.com/o/';

export const JSONHeader = {
  'Content-Type': 'application/json',
};

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    let URL = dbURL;
    if (requestConfig.requestType && requestConfig.requestType === 'Identity') {
      URL = identURL;
    }
    if (requestConfig.requestType && requestConfig.requestType === 'Upload') {
      URL = uploadURL;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(URL + requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : 'GET',
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.postBody
          ? requestConfig.postBody
          : requestConfig.body
          ? JSON.stringify(requestConfig.body)
          : null,
      });

      if (!response.ok) {
        const res = await response.json();
        if (res.error && res.error.message) {
          throw new Error(res.error.message);
        } else {
          throw new Error('Invalid Request');
        }
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, sendRequest };
};
export default useRequest;
