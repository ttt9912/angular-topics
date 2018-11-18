import {Injectable} from "@angular/core";
import {Hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from "rxjs/index";
import {MessageService} from "../message/message.service";

/*
 * @Injectable(): marks the class as one that participates in the dependency injection
 *
 * providedIn: registering a provider of the service,
 * root: Angular creates a single, shared instance of HeroService and injects into
 *       any class that asks for it
 *
 * HeroService class provides an injectable service,
 * and it can also have its own injected dependencies
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) {
  }

  /*
   * synchronous signature
   *
   * problem: if the data is fetched from external server,
   * the HeroService must wait for the server to respond,
   * getHeroes() cannot return immediately with hero data,
   * and the browser will not block while the service waits.
   */
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }


  /*
   * asynchronous signature
   *
   * returns an Observable (RxJS)  that emits a single value,
   * the array of mock heroes
   */
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
}
