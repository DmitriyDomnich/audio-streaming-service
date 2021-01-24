import { AfterContentChecked, AfterViewChecked, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Player } from 'src/app/shared/models/player';
import { PlayerService } from 'src/app/shared/models/services/player.service';

@Component({
  selector: 'app-central-panel',
  templateUrl: './central-panel.component.html',
  styleUrls: ['./central-panel.component.scss']
})
export class CentralPanelComponent implements OnInit, AfterContentChecked, OnChanges {
  @Output() emitter = new EventEmitter();
  isShuffled = false;
  isOnRepeat = false;
  isPaused = false;

  ngOnChanges(): void{

  }
  ngAfterContentChecked(): void{

  }
constructor(
    private playerService: PlayerService,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ){
    iconRegistry.addSvgIconLiteral('play', sanitizer.bypassSecurityTrustHtml(this.playButton));
    iconRegistry.addSvgIconLiteral('pause', sanitizer.bypassSecurityTrustHtml(this.pauseButton));
  }
  pauseButton = `<svg id="Capa_1" enable-background="new 0 0 565.648 565.648" height="512" viewBox="0 0 565.648 565.648" width="512" xmlns="http://www.w3.org/2000/svg"><path d="m282.824 0c-155.947 0-282.824 126.877-282.824 282.824s126.877 282.824 282.824 282.824 282.824-126.877 282.824-282.824-126.877-282.824-282.824-282.824zm-35.353 388.883h-70.706v-212.118h70.706zm141.412 0h-70.706v-212.118h70.706z"/></svg>`;
  playButton = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
   <path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M357.771,264.969
     l-149.333,96c-1.75,1.135-3.771,1.698-5.771,1.698c-1.75,0-3.521-0.438-5.104-1.302C194.125,359.49,192,355.906,192,352V160
     c0-3.906,2.125-7.49,5.563-9.365c3.375-1.854,7.604-1.74,10.875,0.396l149.333,96c3.042,1.958,4.896,5.344,4.896,8.969
     S360.813,263.01,357.771,264.969z"/>
    </svg>`;
  ngOnInit(): void{

  }

  pausePlayer(): void{
    this.playerService.pausePlayer().subscribe(() => {
      this.isPaused = true;
      this.emit();
    });
  }
  resumePlayer(): void{
    this.playerService.resumePlayer().subscribe(() => {
      this.emit();
      this.isPaused = false;
    });
  }
  playPrevious(): void{
    this.playerService.skipToPrevious().subscribe(() => {
      this.emit();
    });
  }
  playNext(): void{
    this.playerService.skipToNext().subscribe(() => {
      this.emit();
    });
  }
  toggleRepeat(activated: boolean): void{
    this.playerService.changeRepeatMode(activated).subscribe(() => {
      this.isOnRepeat = activated;
      this.emit();
    });
  }
  toggleShuffle(activated: boolean): void{
    console.log(activated);
    this.playerService.toggleShuffle(activated).subscribe(() => {
      this.isShuffled = activated;
      this.emit();
    });
  }
  changeRepeatBool(): boolean{
    this.isOnRepeat ? this.isOnRepeat = false : this.isOnRepeat = true;
    return this.isOnRepeat;
  }
  changeShuffleBool(): boolean{
    this.isShuffled ? this.isShuffled = false : this.isShuffled = true;
    return this.isShuffled;
  }

  emit(): void{
    this.emitter.emit('');
  }
}
