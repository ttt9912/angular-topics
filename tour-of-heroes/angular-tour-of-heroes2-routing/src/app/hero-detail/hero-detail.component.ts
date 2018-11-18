import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero/hero';
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero/hero.service";
import {Location} from '@angular/common';

/*
 *  ActivatedRoute: holds information about the route to this instance
 *
 *  route.snapshot: static image of the route information shortly after
 *                  the component was created
 *
 * location: Angular service for interacting with the browser
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private location: Location) {
  }

  ngOnInit() {
    this.getHero();
  }

  /*
   * - get the url parameter 'id'
   * - (+) converts string to number (route params are always strings)
   */
  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');

    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // navigates backward one step in the browser's history stack
  goBack(): void {
    this.location.back();
  }

}
