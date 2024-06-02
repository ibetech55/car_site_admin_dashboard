import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetModelCategory, IGetModelCategoryList } from '../../Data/Brand/ModelCategory/GetModelCategory';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { ICreateModelForm } from '../../Data/Brand/Model/CreateModel';
import { IUpdateModelCategory } from '../../Data/Brand/ModelCategory/UpdateModelCategory';

@Injectable({
  providedIn: 'root'
})
export class ModelCategoryService {

  constructor(private _httpClient: HttpClient) { }

  getModelCategoryList(): Observable<IGetModelCategoryList[]> {
    return this._httpClient.get<IGetModelCategoryList[]>(
      `${environment.BRAND_API_URL}/model_category/list`
    );
  }

  createModelCategory(values:ICreateModelForm): Observable<IGetModelCategory> {
    return this._httpClient.post<IGetModelCategory>(
      `${environment.BRAND_API_URL}/model_category`,
      values
    );
  }

  getModelCategories(): Observable<IGetModelCategory[]> {
    return this._httpClient.get<IGetModelCategory[]>(
      `${environment.BRAND_API_URL}/model_category`
    );
  }


  getModelCategoryById(id:string): Observable<IGetModelCategory> {
    return this._httpClient.get<IGetModelCategory>(
      `${environment.BRAND_API_URL}/model_category/${id}`
    );
  }

  updateModelCategory(id:string, values:IUpdateModelCategory): Observable<boolean> {
    return this._httpClient.put<boolean>(
      `${environment.BRAND_API_URL}/model_category/${id}`,
      values
    );
  }

  deleteModelCategory(id:string): Observable<boolean> {
    return this._httpClient.delete<boolean>(
      `${environment.BRAND_API_URL}/model_category/${id}`
    );
  }
}
