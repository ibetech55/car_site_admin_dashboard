import { IMakeModel } from './make.model';

export const MakeState: IMakeModel = {
  makes: {
    data: [],
    total: 0,
    page: 0,
    limit: 0,
  },
  loading: false,
  makesSaved: false,
  saveMakesError: '',
  makeData: {
    id: '',
    makeName: '',
    origin: '',
    makeLogo: '',
    active: false,
    createdAt: '',
    updatedAt: '',
    yearFounded: 0,
    company: ''
  },
  makeList: [],
  deleteMakeResponse: false,
  verifyMakesResponse: false,
  createMultipleMakesResponse: false,
  createMultipleMakesError: '',
  editMakeError: '',
  editMakeSuccess: false,
  getMakeLogoSuccess: '',
  changeMakeLogoSuccess: false
};
