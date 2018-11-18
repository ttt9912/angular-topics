import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs/index";
import {Hero} from "../hero/hero";
import {HeroService} from "../hero/hero.service";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/internal/operators";

/*
 * Subject: is both Observer and Observable, one can subscribe and
 *          push values into it via next()
 */
@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {
  }

  // Push an input into the search term observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /*
   * Chaining RxJS operators
   * ngOnInit() pipes the searchTerms observable through a sequence of
   * RxJS operators that reduce the number of of http requests
   */
  ngOnInit() {
    this.heroes$ = this.searchTerms.pipe(
      // wait until the flow of new string events pauses for 300ms
      debounceTime(300),

      // ensures that a request is sent only if the filter text changed
      distinctUntilChanged(),

      // calls the search service for each search term that makes it through
      // debounce() and distinctUntilChanged()
      // preserves the original request order while returning only the observable
      // from the most recent HTTP method call. Results from prior calls are canceled and discarded.
      switchMap((term: string) =>
        this.heroService.searchHeroes(term))
    );
  }

}
