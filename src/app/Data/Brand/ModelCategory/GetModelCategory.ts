export interface IGetModelCategoryList {
    id:string;
    type:string;
}

export interface IGetModelCategory {
    id:string;
    type:string;
    active:boolean;
    createdAt: string | Date;
    updatedAt: string | Date;
}