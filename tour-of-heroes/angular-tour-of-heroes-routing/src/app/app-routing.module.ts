import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";

/*
 * Routes tell the router which view to display when a user clicks a link or
 * pastes a URL into the browser address bar.
 *
 * Generally, no components are declared in the router module, therefore:
 *  - delete the @NgModule.declarations array and CommonModule references
 *
 * The router is configured with Routes in the RouterModule
 * - import Routes and RouterModule
 * - initialize RouterModule via RouterModule.forRoot(routes)
 * - export RouterModule
 *
 * Exporting RouterModule makes router directives available for use in the
 * AppModule components
 */

// redirectTo: redirects a URL that fully matches the empty path to the route whose path is '/dashboard'
const routes: Routes = [
  {path: 'heroes', component: HeroesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'detail/:id', component: HeroDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}



