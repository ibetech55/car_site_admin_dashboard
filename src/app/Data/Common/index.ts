export interface ISelect {
  name: string;
  code: string | boolean;
}

export interface IExportType {
  exportAll?: boolean;
  paginate?: boolean;
}

export interface IExportBody {
  key: string;
}
