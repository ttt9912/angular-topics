import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero/hero";
import {HeroService} from "../hero/hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];

  constructor(private heroService: HeroService) {
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    // creates an Hero object with empty id
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  /*
   * NOTE: Although the component delegates hero deletion to the HeroService,
   * it remains responsible for updating its own list of heroes
   *
   * There's really nothing for the component to do with the Observable returned by heroService.delete().
   * It must subscribe anyway, otherwise the service will not send the delete request to the server!
   */
  deleteHero(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
