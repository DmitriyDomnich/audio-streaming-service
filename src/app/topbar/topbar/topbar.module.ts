import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar.component';
import { NavbuttonsComponent } from './navbuttons/navbuttons/navbuttons.component';
import { SearchFieldComponent } from './searchfield/search-field/search-field.component';
import { AccountComponent } from './account/account/account.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TopbarComponent, NavbuttonsComponent, SearchFieldComponent, AccountComponent],
  exports: [TopbarComponent]
})
export class TopbarModule { }
