import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { IArtwork } from '../models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public artwork$: Observable<IArtwork> = null;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.artwork$ = this.apiService.getRandomArtwork();
  }

}
