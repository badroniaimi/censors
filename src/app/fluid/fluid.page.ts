/**
 * Chatter - Chat themes Ionic 4 (https://www.enappd.com)
 *
 * Copyright © 2018-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source .
 * 
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController, Platform } from '@ionic/angular';
import { FCM } from '@ionic-native/fcm/ngx';

@Component({
  selector: 'app-fluid',
  templateUrl: './fluid.page.html',
  styleUrls: ['./fluid.page.scss'],
})
export class FluidPage implements OnInit {
  currentUser: string;
  selectedUser: String;
  conversation = new Array<any>();
  phone_model = 'iPhone';
  input = '';
  sender = 0;
  constructor(private platform: Platform,
    public alertController: AlertController, private menuCtrl: MenuController, private fcm: FCM,private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background", data);
      } else {
        console.log("Received in foreground", data);
      };
      this.conversation.push({ text: data.text, time: data.time });
      this.changeDetectorRef.detectChanges();
      setTimeout(() => {
        this.scrollToBottom()
      }, 10)
    });
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false, 'end');
    this.menuCtrl.enable(true, 'start');

    setTimeout(() => {
      this.scrollToBottom()
    }, 10)
    setTimeout(() => {
      this.presentAlert();
    }, 100)


  }
  ionViewWillLeave() {
  }

  async presentAlert() {
    /*if (this.device.platform = 'iOS') {
      switch (this.platform.height()) {
        case 812:
          this.phone_model = 'iPhone X';
          break;
        case 736:
          this.phone_model = 'iPhone 6/7/8 Plus';
          break;
        case 667:
          this.phone_model = 'iPhone 6/7/8';
          break;
      }
    }*/
  }

  send() {
    if (this.input != '') {
      this.conversation.push({ text: "test", sender: 0, image: 'assets/images/logo.png' });
      this.input = '';
      setTimeout(() => {
        this.scrollToBottom()
      }, 10)
    }
  }

  scrollToBottom() {
    let content = document.getElementById("chat-container");
    let parent = document.getElementById("chat-parent");
    let scrollOptions = {
      left: 0,
      top: content.offsetHeight
    }

    parent.scrollTo(scrollOptions)
  }


}
