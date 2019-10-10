import { Component, Input, OnInit } from '@angular/core';
import { IArtwork } from '../models';

@Component({
  selector: 'app-art-info',
  templateUrl: './art-info.component.html',
  styleUrls: ['./art-info.component.css']
})
export class ArtInfoComponent implements OnInit {

  @Input()
  public artwork: IArtwork = null;

  constructor() { }

  ngOnInit() {
  }

}
