import axios from 'axios';

export const createAPI = () => {
  const api = axios.create({
    baseURL: `/api`,
    timeout: 25000,
    withCredentials: true
  });

  /*
  const onSuccess = (response) => response;
  const onFail = (error) => throw error;
  api.interceptors.response.use(onSuccess, onFail);
  */

  return api;
};
