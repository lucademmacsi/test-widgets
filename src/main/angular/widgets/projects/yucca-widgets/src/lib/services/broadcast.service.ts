import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {

  constructor() { }
  private event: Subject<Event> = new Subject<Event>();

  public next(e: Event): void {
    return this.event.next(e);
  }

  public getEvents(event: Event): Observable<Event> {
    // DO NOT SUBSCRIBE HERE. Return the observable.
    // Only keep events matching the given `event` param
    return this.event.asObservable();
  }
}
