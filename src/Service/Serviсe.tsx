import axios, { AxiosResponse, AxiosInstance } from 'axios';
import { AuthorizationData, IProfile } from './ServiceTypes';

const localhost = axios.create({
  baseURL: 'http://localhost:3000/',
});

class Service {
  private baseURL: AxiosInstance;

  constructor(baseURL: AxiosInstance) {
    this.baseURL = baseURL;
  }

  async getProfiles() {
    const profilesResponse = await this.baseURL.get('profiles');
    return profilesResponse.data;
  }

  async checkAuthorizaitonStatus(
    number: string,
    password: string
  ): Promise<'error' | IProfile> {
    const allProfiles = await this.getProfiles();
    let authorizationStatus: 'error' | 'ok' = 'error';
    let currentProfile = {
      userName: 'test',
      password: 'test',
      number: '1',
      contacts: [],
    };
    for (let i = 0; i < allProfiles.length; i++) {
      if (
        allProfiles[i].number === String(number) &&
        allProfiles[i].password === String(password)
      ) {
        currentProfile = allProfiles[i];
        authorizationStatus = 'ok';
      }
    }
    if (authorizationStatus === 'ok') {
      return currentProfile;
    } else {
      return 'error';
    }
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

  async searchProfile(query: string) {
    const findedProfiles = await this.baseURL.get(`profiles?q=${query}`);
    return findedProfiles.data;
  }

  async addContact(
    numberOfCurrentProfile: string,
    numberOfProfileForAdd: string,
    userName: string
  ) {
    let profileForAddNumber = await this.baseURL.get(
      `profiles?q=${numberOfCurrentProfile}`
    );
    profileForAddNumber.data[0].contacts.push({
      number: numberOfProfileForAdd,
      userName,
    });
    await this.baseURL.put(
      `profiles/${profileForAddNumber.data[0].id}`,
      profileForAddNumber.data[0]
    );
  }

  async deleteContact(profile: IProfile, numberToDelete: string) {
    let profileForDeleting = await this.baseURL.get(
      `profiles?q=${profile.number}`
    );
    for (let i = 0; i < profileForDeleting.data[0].contacts.length; i++) {
      if (profileForDeleting.data[0].contacts[i].number === numberToDelete) {
        profileForDeleting.data[0].contacts.splice(i, 1);
      }
    }

    await this.baseURL.put(
      `profiles/${profileForDeleting.data[0].id}`,
      profileForDeleting.data[0]
    );
  }
}

export const localHostService = new Service(localhost);
