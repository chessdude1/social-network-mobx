import { makeAutoObservable } from 'mobx';
import { IProfile } from '../Service/ServiceTypes';

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

  setUserAuthorized() {
    this.isAutorized = true;
  }

  setUserNotAuthorized() {
    this.isAutorized = false;
  }

  setNewUser(profile: IProfile) {
    this.profile = profile;
  }

  setContacts(userName: string, number: string) {
    this.profile.contacts = [...this.profile.contacts, { userName, number }];
  }
}

export const UserStore = new User();
