import axios, { AxiosResponse, AxiosInstance } from 'axios';

const localhost = axios.create({
  baseURL: 'http://localhost:3000/',
});

class Service {
  private baseURL: AxiosInstance;

  constructor(baseURL: AxiosInstance) {
    this.baseURL = baseURL;
  }

  async getProfiles() {
    const movieResponse = await this.baseURL.get(`profiles`);
    console.log(movieResponse);
    return movieResponse.data;
  }
}

export const localHostService = new Service(localhost);
