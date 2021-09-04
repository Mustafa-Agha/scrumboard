import axios from 'axios';
import urljoin from 'url-join';
import UrlPattern from 'url-pattern';

axios.interceptors.response.use(
  async (response: any) => {
    await delay(500);
    return response;
  },
  (err: any) => {
    return Promise.reject(err.message || err);
  },
);

const delay = (time = 1000) =>
  new Promise<void>(resolve => setTimeout(resolve, time));

const responseBody = (response: {data: any}) => response.data;

interface IEndpoints {
  [key: string]: UrlPattern;
}

class API {
  public static instance: API;
  public baseURL: string;
  public endpoints: IEndpoints;

  constructor(baseURL: string, endpoints: IEndpoints) {
    this.baseURL = baseURL;
    this.endpoints = endpoints;
    API.instance = this;
    axios.defaults.baseURL = baseURL;
  }

  public get = async (api: string, options: any) => {
    let endpoint = this.endpoints[api].stringify(options);
    let apiUrl = urljoin(endpoint);
    return axios.get(apiUrl).then(responseBody);
  }

  public post = async (api: string, options: any, body: any) => {
    let endpoint = this.endpoints[api].stringify(options);
    let apiUrl = urljoin(endpoint);
    return axios.post(apiUrl, body).then(responseBody);
  }

  public patch = async (api: string, options: any, body: any) => {
    let endpoint = this.endpoints[api].stringify(options);
    let apiUrl = urljoin(endpoint);
    return axios.patch(apiUrl, body).then(responseBody);
  }

  public del = async (api: string, options: any, body: any) => {
    let endpoint = this.endpoints[api].stringify(options);
    let apiUrl = urljoin(endpoint);
    return axios
      .delete(apiUrl, {data: body, headers: options})
      .then(responseBody);
  }
}

export default API;
