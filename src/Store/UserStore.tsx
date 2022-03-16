import { makeAutoObservable } from 'mobx';

class User {
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }

  increment() {
    this.count = this.count + 1;
  }

  decrement() {
    this.count = this.count - 1;
  }
}

export const UserStore = new User();
