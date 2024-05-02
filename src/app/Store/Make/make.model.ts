import { IGetMake, IGetMakePagination, IGetMakesList } from '../../Data/Brand/Makes/GetMakes';

export interface IMakeModel {
  makes: IGetMakePagination;
  loading: boolean;
  makesSaved: boolean;
  saveMakesError: string
  makeData:IGetMake;
  makeList:IGetMakesList[];
  deleteMakeResponse:boolean;
  verifyMakesResponse:boolean;
}
