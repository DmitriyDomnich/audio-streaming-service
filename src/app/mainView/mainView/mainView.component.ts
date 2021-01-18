import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainView',
  templateUrl: './mainView.component.html',
  styleUrls: ['./mainView.component.css']
})
export class MainViewComponent implements OnInit {
  @Output() pressed = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }
  press(): void{
    this.pressed.emit();
  }
  removeToken(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('creationTime');
    this.router.navigate(['login']);
  }
}
