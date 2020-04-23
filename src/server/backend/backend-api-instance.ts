import dotenv from "dotenv";
import axios from "axios";
import axiosRetry from "axios-retry";
import https from "https";
import BackendAPI from './backend-api';

dotenv.config();

const api = axios.create({
  baseURL: 'https://hw.shri.yandex/api/',
  timeout: 10000,
  headers: {
    Authorization: 'Bearer ' + process.env.AUTH_TOKEN
  },
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});

export default new BackendAPI(api);
