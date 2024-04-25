import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  IGetModelByMakeId,
  IGetModelPagination,
} from '../../Data/Brand/Model/GetModel';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor(private _httpClient: HttpClient) {}

  getModelsByMakeId(id: string): Observable<IGetModelByMakeId[]> {
    return this._httpClient.get<IGetModelByMakeId[]>(
      `${environment.BRAND_API_URL}/model/modelsByMakeId/${id}`
    );
  }

  getModels(): Observable<IGetModelPagination> {
    return this._httpClient.get<IGetModelPagination>(
      `${environment.BRAND_API_URL}/model?orderBy[modelName]=asc`
    );
  }
}
