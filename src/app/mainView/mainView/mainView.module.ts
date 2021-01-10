import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './mainView.component';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule
  ],
  declarations: [MainViewComponent],
  exports: [
    MainViewComponent
  ]
})
export class MainViewModule { }
