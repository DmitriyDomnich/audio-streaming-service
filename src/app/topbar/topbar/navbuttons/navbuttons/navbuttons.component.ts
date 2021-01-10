import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-navbuttons',
  templateUrl: './navbuttons.component.html',
  styleUrls: ['./navbuttons.component.scss']
})
export class NavbuttonsComponent implements OnInit {

  constructor(
    private location: Location
  ) { }

  ngOnInit() {
  }
  goBack(): void{
    this.location.back();
  }
  goForward(): void{
    this.location.forward();
  }
}
