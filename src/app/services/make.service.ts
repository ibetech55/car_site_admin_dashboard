import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IGetMake,
  IGetMakePagination,
  IGetMakesList,
  IMakeOrderBy,
  IMakesFilter,
} from '../Data/Brand/Makes/GetMakes';
import {
  ISaveMakes,
  ISaveMakesRequestData,
} from '../Data/Brand/Makes/SaveMakes';
import { IEditMake } from '../Data/Brand/Makes/EditMake';
import { IOrderData, IPagination, IPaginationData } from '../Data/IPagination';
import { HandleQueryString } from '../../utils/HandleQueryString';
import { IExportBody } from '../Data/Common';

@Injectable({
  providedIn: 'root',
})
export class MakeService {
  constructor(
    private _httpClient: HttpClient,
    private _handleQueryString: HandleQueryString
  ) {}

  getMakes(
    filters: IPagination<IMakesFilter, IMakeOrderBy>
  ): Observable<IGetMakePagination> {
    const queryString = this._handleQueryString.execute<
      IMakesFilter,
      IMakeOrderBy
    >(filters);
    return this._httpClient.get<IGetMakePagination>(
      `http://localhost:5003/brand_api/make${queryString}`
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
        company: x.company ? x.company : undefined,
        yearFounded: x.yearFounded ? x.yearFounded : undefined,
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
      `http://localhost:5003/brand_api/make/getById/${id}`
    );
  }

  editMake(id: string, values: IEditMake): Observable<boolean> {
    return this._httpClient.put<boolean>(
      `http://localhost:5003/brand_api/make/${id}`,
      values
    );
  }

  getMakesList(): Observable<IGetMakesList[]> {
    return this._httpClient.get<IGetMakesList[]>(
      'http://localhost:5003/brand_api/make/carList'
    );
  }

  deleteMake(id: string): Observable<boolean> {
    return this._httpClient.delete<boolean>(
      `http://localhost:5003/brand_api/make/${id}`
    );
  }

  verifyMakes(ids: string[], requestType: string): Observable<boolean> {
    return this._httpClient.patch<boolean>(
      `http://localhost:5003/brand_api/make/verifyMake/${requestType}`,
      { ids: ids }
    );
  }

  createMultipleMakes(file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('fileData', file);
    return this._httpClient.post<boolean>(
      `http://localhost:5003/brand_api/make/multiples`,
      formData
    );
  }

  getMakeLogo(id: string): Observable<string> {
    return this._httpClient.get<string>(
      `http://localhost:5003/brand_api/make/get-make-logo/${id}`
    );
  }

  changeMakeLogo(id: string, makeLogo: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('makeImage', makeLogo);
    return this._httpClient.patch<boolean>(
      `http://localhost:5003/brand_api/make/changeMakeLogo/${id}`,
      formData
    );
  }

  downloadCreateMakesTemplate(): Observable<Blob> {
    return this._httpClient.get<Blob>(
      `http://localhost:5003/brand_api/make/create-makes-template`,
      {
        responseType: 'blob' as 'json',
      }
    );
  }

  exportMakesData(
    exportType: string,
    columns: IExportBody[],
    filters: IPagination<IMakesFilter, IMakeOrderBy>
  ): Observable<Blob> {
    const queryString = this._handleQueryString.execute<
      IMakesFilter,
      IMakeOrderBy
    >(filters);
    return this._httpClient.post<Blob>(
      `http://localhost:5003/brand_api/make/export-makes-data/${exportType}${queryString}`,
      { columns },
      {
        responseType: 'blob' as 'json',
      }
    );
  }
}
