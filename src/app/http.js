import axios from 'axios';
import { multiClientMiddleware } from 'redux-axios-middleware';

export const axiosClients = {
  default: {
    client: axios.create({
      baseURL: '/',
      responseType: 'json',
    }),
  }
};

export const axiosRequest = requestAction => axiosClients.default.client
  .request(requestAction.payload.request).then(response => response)
  .catch(error => console.log('Axios error', error));


export const middleware = multiClientMiddleware(axiosClients,
  {
    returnRejectedPromiseOnError: true,
  });

export function initialize(store) {
  console.log('init store: ', store);
}
