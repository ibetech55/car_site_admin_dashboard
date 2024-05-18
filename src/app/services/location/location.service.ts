import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGetCountryList } from '../../Data/Location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _httpClient: HttpClient) { }

  getCountriesList(): Observable<IGetCountryList[]> {
    return this._httpClient.get<IGetCountryList[]>(
      `http://172.17.0.1:5010/location_api/countries`
    );
  }
}
