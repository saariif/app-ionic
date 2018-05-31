import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  //global variableSanp
  eventList : Array<any>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventListPage');
    this.eventProvider.getEventList()
    .on('value', eventListSnapshot=>{
      this.eventList = [];
      eventListSnapshot.forEach(snap=>{
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
          contact: snap.val().contact
        });
        return false;
      });
    });
  }
  //melihat detail suatu event
  goToEventDetail(eventId): void{
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }
}
