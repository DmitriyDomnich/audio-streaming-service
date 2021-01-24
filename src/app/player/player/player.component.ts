import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/models/services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit {
  player: Player = {};

  constructor(
    private playerService: PlayerService
  ) { }
  checkPlayer(): any{

  }
  ngAfterViewInit(): void{
    // console.log(1);
    // // this.playerService.changePlayback().subscribe();
    // console.log(2);
    // this.playerService.getCurrentPlayer().subscribe(data => {
    //   this.player = data;
    //   console.log(this.player);
    // });
  }
}
