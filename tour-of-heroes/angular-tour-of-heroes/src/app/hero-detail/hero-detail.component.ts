import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero/hero';

/*
 * @Input: settable property, values flow into the property when it is
 *         data bound with a property binding [hero]=...
 */
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  // value flows in from HeroComponent
  @Input() hero: Hero;

  constructor() {
  }

  ngOnInit() {
  }

}
