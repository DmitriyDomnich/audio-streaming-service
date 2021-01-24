import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { PlayerService } from 'src/app/shared/models/services/player.service';


@Component({
  selector: 'app-right-panel',
  templateUrl: './right-panel.component.html',
  styleUrls: ['./right-panel.component.scss']
})
export class RightPanelComponent implements OnInit {

  constructor(
    private playerService: PlayerService
  ) { }

  ngOnInit() {
  }
  changeVolume(num: number): void{
    this.playerService.setVolume(num).subscribe();
  }
}
