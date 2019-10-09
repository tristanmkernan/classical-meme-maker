import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IArtwork } from '../models';
import { switchMap } from 'rxjs/operators';

interface ISearchResult {
  total: number;
  objectIDs: number[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getRandomArtwork(): Observable<IArtwork> {
    return this.http.get<ISearchResult>(
      'https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=11&&hasImages=true&q=person'
    )
      .pipe(
        switchMap(
          results => {
            const objectId = results.objectIDs[Math.round(Math.random() * results.total)];

            return this.http.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`
            );
          }
        )
      );
  }
}
