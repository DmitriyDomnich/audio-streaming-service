import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { LeftInfoComponent } from './leftinfo/left-info/left-info.component';
import { MatSliderModule } from '@angular/material/slider';
import { CentralPanelComponent } from './central-panel/central-panel/central-panel.component';
import { RightPanelComponent } from './right-panel/right-panel/right-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatSliderModule
  ],
  declarations: [PlayerComponent, LeftInfoComponent, CentralPanelComponent, RightPanelComponent],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule { }
