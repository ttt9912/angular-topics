import {Injectable} from "@angular/core";
import {Hero} from './hero';
import {Observable, of} from "rxjs/index";
import {MessageService} from "../message/message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, tap} from "rxjs/internal/operators";

/*
 * HttpClient:
 * - methods return an RxJS Observable of something
 * - an observable can return multiple values over time
 * - HttpClient always emits a single value and then completes,
 *   never to emit again
 *
 * catchError(): catches errors, observable result from http.get() is
 *               "piped" the  through an RxJS catchError() operator
 *
 * tap: tap into the flow of observable values
 */
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api


  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched all heroes from http')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  // GET
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
      .pipe(
        tap(_ => this.log(`fetched hero with id=${id}`)),
        catchError(this.handleError<Hero>(`getHero id=${id}`))
      );
  }

  // PUT
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap(_ => this.log(`updated hero id=${hero.id}`)),
        catchError(this.handleError<any>('updateHero'))
      );
  }

  // POST - expects the server to generate an id for the new hero
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
      .pipe(
        tap((hero: Hero) => this.log(`added hero with id=${hero.id}`)),
        catchError(this.handleError<Hero>('addHero'))
      );
  }

  // DELETE
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
      );
  }

  // GET heroes whose name contains search term
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`)
      .pipe(
        tap(_ => this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }


  // Handle http error and then returns an innocuous result so that the application keeps working
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
