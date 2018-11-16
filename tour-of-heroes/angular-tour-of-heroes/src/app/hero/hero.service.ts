import {Injectable} from "@angular/core";
import {Hero} from './hero';
import {HEROES} from './mock-heroes';

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

  constructor() {
  }

  getHeroes(): Hero[] {
    return HEROES;
  }
}
