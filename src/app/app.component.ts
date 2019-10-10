import { Component, OnInit } from '@angular/core';
// @ts-ignore
import FontFaceObserver from 'fontfaceobserver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const font = new FontFaceObserver('Impact');
    font.load();
  }
}
