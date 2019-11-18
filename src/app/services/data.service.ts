import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseUrl: string;
  public user: User;
  public data;
  constructor(private http: HttpClient, private toastCtrl: ToastController) {
    this.baseUrl = "http://192.168.1.15/api/v1/";
    this.user = new User();
  }
  getParents() {
    return this.http.get(this.baseUrl + "getParents");
  }
  login() {
    return this.http.post(this.baseUrl + "login", this.user);
  }
  register() {
    return this.http.post(this.baseUrl + "save", this.user);
  }
  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
export class User {
  id: number;
  parent_id: number;
  name: string;
  email: string;
  password: string;
  device_id: string;
}
