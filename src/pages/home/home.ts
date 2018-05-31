import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  // mengarah ke halaman profile
  goToProfile(): void {
    this.navCtrl.push('ProfilePage');
  }

  // mengarah ke form create event baru
  goToCreate(): void {
    this.navCtrl.push('EventCreatePage');
  }

  // mengarah ke list semua event
  goToList(): void {
    this.navCtrl.push('EventListPage');
  }
}