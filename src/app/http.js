import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';

export const axiosClients = {
  default: {
    client: axios.create({
      baseURL: '/api',
      responseType: 'json',
    }),
  },
  system: {
    client: axios.create({
      baseURL: '/system',
      responseType: 'json',
    }),
  },
};

export const middleware = multiClientMiddleware(axiosClients,
  {
    returnRejectedPromiseOnError: true,
  });

export function initialize(store) {
  console.log('init store: ', store);
}
