export interface ISaveMakes {
    makeName: string;
    origin:string;
    makeImage: File;
    imageId: string;
}

export interface ISaveMakesRequestData {
    makeName: string;
    origin:string;
    imageId?: string;
}

