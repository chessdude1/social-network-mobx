import { makeAutoObservable } from 'mobx';
import { IProfile } from '../Service/ServiceTypes';
import { localHostService } from '../Service/Serviсe';

class User {
  isAutorized: boolean = false;
  profile: IProfile = {
    userName: 'test',
    password: 'test',
    number: '1',
    contacts: [],
  };
  constructor() {
    makeAutoObservable(this);
  }

  deleteContact(number: string) {
    for (let i = 0; i < this.profile.contacts.length; i++) {
      if (this.profile.contacts[i].number === String(number)) {
        this.profile.contacts.splice(i, 1);
      }
    }
    localHostService.deleteContact(this.profile, number);
  }

  setUserAuthorized() {
    this.isAutorized = true;
  }

  setUserNotAuthorized() {
    this.isAutorized = false;
  }

  setNewProfile(profile: IProfile) {
    this.profile = profile;
  }

  getProfile() {
    return this.profile;
  }

  setContacts(userName: string, number: string) {
    this.profile.contacts = [...this.profile.contacts, { userName, number }];
  }
}

export const UserStore = new User();
