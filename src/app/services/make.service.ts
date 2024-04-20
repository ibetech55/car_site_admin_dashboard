import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IGetMake, IGetMakePagination } from '../Data/Brand/Makes/GetMakes';
import {
  ISaveMakes,
  ISaveMakesRequestData,
} from '../Data/Brand/Makes/SaveMakes';

@Injectable({
  providedIn: 'root',
})
export class MakeService {
  constructor(private _httpClient: HttpClient) {}

  getMakes(): Observable<IGetMakePagination> {
    return this._httpClient.get<IGetMakePagination>(
      'http://localhost:5003/brand_api/make'
    );
  }

  saveMakes(values: ISaveMakes[]) {
    const formData = new FormData();

    values.map((d) => {
      if (d.makeImage) {
        const newMakeImage = new File(
          [d.makeImage],
          JSON.stringify({
            name: d.makeImage.name,
            id: d.imageId,
          }),
          { type: d.makeImage.type }
        );
        formData.append('makeImage', newMakeImage);
      }
    });

    const mappedValues: ISaveMakesRequestData[] = values.map((x) => {
      return {
        makeName: x.makeName,
        origin: x.origin,
        imageId: x.imageId ? x.imageId : undefined,
      };
    });
    formData.append('data', JSON.stringify(mappedValues));

    return this._httpClient.post<boolean>(
      'http://localhost:5003/brand_api/make',
      formData
    );
  }
  getMakeById(id: string): Observable<IGetMake> {
    return this._httpClient.get<IGetMake>(
      `http://localhost:5003/brand_api/make/${id}`
    );
  }
}
