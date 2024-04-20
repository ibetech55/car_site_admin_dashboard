import { IGetMake, IGetMakePagination } from '../../Data/Brand/Makes/GetMakes';

export interface IMakeModel {
  makes: IGetMakePagination;
  loading: boolean;
  makesSaved: boolean;
  saveMakesError: string
  makeData:IGetMake;
}
