import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mainView',
  templateUrl: './mainView.component.html',
  styleUrls: ['./mainView.component.css']
})
export class MainViewComponent implements OnInit {
  @Output() pressed = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  press(): void{
    this.pressed.emit();
  }
}
