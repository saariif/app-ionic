import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from '@firebase/database-types';

@Injectable()
export class EventProvider {
  //global variable
  public eventListRef:Reference;

  constructor() {
    console.log('Hello EventProvider Provider');
    firebase.auth().onAuthStateChanged(user=>{
      if(user){
        this.eventListRef=firebase.database()
        .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  //fungsi untuk membuat event baru
  createEvent(
    eventName:string, eventPrice:number, 
    eventDate:string, eventContact:string
  ): ThenableReference{
    return this.eventListRef.push({
      name: eventName, price: eventPrice* 1,
      date: eventDate, contact: eventContact
    });
  }

  //fungsi untuk melihat semua daftar event
  getEventList(): Reference {
    return this.eventListRef;
  }

  //fungsi untuk melihat detail satu event
  getEventDetail(eventId: string): Reference {
    return this.eventListRef.child(eventId);
  }
}
