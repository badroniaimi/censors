import { Component } from '@angular/core';
import { User, DataService } from '../services/data.service';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  login: boolean = true;
  email: string;
  name: string;
  password: string;
  user: User;
  parent;
  parents;
  constructor(private data: DataService, private fcm: FCM, private router: Router) {
  }

  ngOnInit() {
    this.data.getParents().subscribe((users) => {
      this.parents = users;
    }, (err) => {
      console.log(err)
    });
  }
  segmentChanged(event) {
    this.login = !this.login;
    console.log(event);
  }
  loginUser() {
    this.data.user.email = this.email;
    this.data.user.password = this.password;
    this.fcm.getToken().then(token => {
      this.data.user.device_id = token;
      this.data.login().subscribe((user: User) => {
        this.data.user = user;
        this.router.navigate(['/chat'])
      }, (err) => {
        this.data.showToast(err.error.error);
      })
    });
  }
  registerUser() {
    this.data.user.email = this.email;
    this.data.user.password = this.password;
    this.data.user.name = this.name;
    this.data.user.parent_id = this.parent ? this.parent : null;
    this.data.register().subscribe((user) => {
      this.data.showToast("Done!!");
    }, (err) => {
      this.data.showToast(err.error.message);
    })
  }
}
