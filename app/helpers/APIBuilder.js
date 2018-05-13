import { create } from 'axios';

import APIConstants from '../constants/API';

const API = create({
  baseURL: `${APIConstants.HOST_URL}:${APIConstants.HOST_PORT}`,
  timeout: 10000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

export default {
  API,
};
