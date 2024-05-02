export interface ISaveMakes {
  makeName: string;
  origin: string;
  makeImage: File;
  imageId: string;
  company: string;
  yearFounded: number;
}

export interface ISaveMakesRequestData {
  makeName: string;
  origin: string;
  imageId?: string;
  company?: string;
  yearFounded?: number;
}
