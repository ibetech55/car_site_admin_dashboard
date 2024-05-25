import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  IGetModelById,
  IGetModelByMakeId,
  IGetModelPagination,
} from '../../Data/Brand/Model/GetModel';
import { environment } from '../../../environments/environment.development';
import { ICreateModel } from '../../Data/Brand/Model/CreateModel';
import { IEditModel } from '../../Data/Brand/Model/UpdateModel';

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
      `http://localhost:5003/brand_api/model/${id}`
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
}
