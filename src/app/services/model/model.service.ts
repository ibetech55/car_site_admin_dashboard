import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  IGetModelById,
  IGetModelByMakeId,
  IGetModelPagination,
  IModelFilter,
  IModelOrderBy,
} from '../../Data/Brand/Model/GetModel';
import { environment } from '../../../environments/environment.development';
import { ICreateModel } from '../../Data/Brand/Model/CreateModel';
import { IEditModel } from '../../Data/Brand/Model/UpdateModel';
import { HandleQueryString } from '../../../utils/HandleQueryString';
import { IPagination } from '../../Data/IPagination';

@Injectable({
  providedIn: 'root',
})
export class ModelService {
  constructor(
    private _httpClient: HttpClient,
    private _handleQueryString: HandleQueryString
  ) {}

  getModelsByMakeId(id: string): Observable<IGetModelByMakeId[]> {
    return this._httpClient.get<IGetModelByMakeId[]>(
      `${environment.BRAND_API_URL}/model/modelsByMakeId/${id}`
    );
  }

  getModels(filters:IPagination<IModelFilter, IModelOrderBy>): Observable<IGetModelPagination> {
    const queryString = this._handleQueryString.execute<
      IModelFilter,
      IModelOrderBy
    >(filters);

    return this._httpClient.get<IGetModelPagination>(
      `${environment.BRAND_API_URL}/model${queryString}`
    );
  }

  saveModels(values: ICreateModel[]): Observable<boolean> {
    return this._httpClient.post<boolean>(
      `${environment.BRAND_API_URL}/model`,
      values
    );
  }

  saveMultipleModels(file: File): Observable<boolean> {
    const formData = new FormData();
    formData.append('fileData', file);
    return this._httpClient.post<boolean>(
      `${environment.BRAND_API_URL}/model/multiples`,
      formData
    );
  }

  verifyModels(ids: string[], requestType: string): Observable<boolean> {
    return this._httpClient.patch<boolean>(
      `http://localhost:5003/brand_api/model/verifyModels/${requestType}`,
      { ids: ids }
    );
  }

  getModelById(id: string): Observable<IGetModelById> {
    return this._httpClient.get<IGetModelById>(
      `http://localhost:5003/brand_api/model/getById/${id}`
    );
  }

  editModel(id: string, values: IEditModel): Observable<boolean> {
    return this._httpClient.put<boolean>(
      `http://localhost:5003/brand_api/model/${id}`,
      values
    );
  }

  deleteModel(id: string): Observable<boolean> {
    return this._httpClient.delete<boolean>(
      `http://localhost:5003/brand_api/model/${id}`
    );
  }

  downloadCreateModelsTemplate(): Observable<Blob> {
    return this._httpClient.get<Blob>(
      `http://localhost:5003/brand_api/model/createModelsTemplate`,
      {
        responseType: 'blob' as 'json',
      }
    );
  }
}
