import { Injectable } from "@angular/core";
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})

export class ImagePreview {
  generateImageUrl(file: File) {
    return URL.createObjectURL(file);
  }

  generateImageId(): string {
    return `_${CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)}`;
  }

  removeImageUrl(url:string) {
    return URL.revokeObjectURL(url);
  }
}
