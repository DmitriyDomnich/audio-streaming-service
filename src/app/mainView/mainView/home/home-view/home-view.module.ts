import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view.component';
import { ShortcutsComponent } from './shortcuts/shortcuts/shortcuts.component';
import { NewReleasesComponent } from './new-releases/new-releases/new-releases.component';

import { FeaturedComponent } from './featured/featured/featured.component';
import { MatCard } from '@angular/material/card';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [HomeViewComponent, ShortcutsComponent, NewReleasesComponent, FeaturedComponent]
})
export class HomeViewModule { }
