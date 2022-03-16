import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { IProfile } from './ServiceTypes';

const localhost = axios.create({
  baseURL: 'http://localhost:3000/',
});

class Service {
  private baseURL: AxiosInstance;

  constructor(baseURL: AxiosInstance) {
    this.baseURL = baseURL;
  }

  async getProfiles() {
    const movieResponse = await this.baseURL.get('profiles');
    console.log(movieResponse);
    return movieResponse.data;
  }

  async setNewProfile(newProfile: IProfile): Promise<'error' | 'ok'> {
    const allNumbers = await this.baseURL.get('numbers');

    if (Object.keys(allNumbers.data).includes(newProfile.number)) {
      return 'error';
    }
    await this.baseURL.post('profiles', newProfile);

    await this.baseURL.post('users', {
      userName: newProfile.userName,
      number: newProfile.number,
    });

    await this.baseURL.patch('numbers', newProfile.number);

    return 'ok';
  }
}

export const localHostService = new Service(localhost);
