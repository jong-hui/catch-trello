import { makeAutoObservable } from "mobx";

export class AppStore {
  themeVariant: 'dark' | 'light' = 'dark'

  constructor() {
    makeAutoObservable(this)
  }
}