import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero/hero";
import {HeroService} from "../hero/hero.service";

/*
 * @Component: decorator function that specifies the Angular metadata for the component
 * - selector: the component's CSS element selector, matches the name of the HTML element
 *             that identifies this component within a parent component's template
 * - templateUrl: the location of the component's template file.
 * - styleUrls: the location of the component's private CSS styles.
 *
 * ngOnInit: lifecycle hook called after creation, good for initialization logic
 *
 * export: always export the component class so you can import it elsewhere
 */
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // expose variables for binding
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  heroes: Hero[];
  selectedHero: Hero;

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /*
   * assignment occurs synchronously: if the server doesn't return heroes instantly
   * the browser freezes the UI while waiting
   */
  // getHeroes(): void {
  //   this.heroes = this.heroService.getHeroes();
  // }

  /*
   * asynchronous approach: waits for the Observable to emit the array of heroes,
   * then subscribe passes the emitted array to the callback, which sets the component's heroes property
   */
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
