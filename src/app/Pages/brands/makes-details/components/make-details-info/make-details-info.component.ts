import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, delay } from 'rxjs';
import { IGetModelByMakeId } from '../../../../../Data/Brand/Model/GetModel';
import { IGetMake } from '../../../../../Data/Brand/Makes/GetMakes';
import { ImagePreview } from '../../../../../../utils/ImagePreview';
import { makeActions } from '../../../../../Store/Make/make.action';
import { makeSelector } from '../../../../../Store/Make/make.selector';
import { Store } from '@ngrx/store';
import { CONSTANTS } from '../../../../../Constants';

@Component({
  selector: 'app-make-details-info',
  templateUrl: './make-details-info.component.html',
  styleUrl: './make-details-info.component.scss',
})
export class MakeDetailsInfoComponent {
  constructor(private _store: Store, private _imagePreview: ImagePreview) {}
  @Input() makeData$!: Observable<IGetMake>;
  @Input() openEditModal!: () => void;
  @Input() id!: string;
  makeImage?: File;
  makeLogoUrl$ = '';
  previewImage = {
    url: '',
    id: '',
    alt: '',
  };
  changeMakeLogoSub = new Subscription();
  getMakeLogoSub = new Subscription();

  loadingImage = false;
  errorImageType$ = new BehaviorSubject('');

  onUpload(file: File) {
    if(CONSTANTS.XLSX_FILE_EXT.includes(file.type)){
      this.makeImage = file;
      this.previewImage.url = this._imagePreview.generateImageUrl(this.makeImage);
      this.previewImage.id = this._imagePreview.generateImageId();
      this.previewImage.alt = this.makeImage.name;
    } else {
      this.errorImageType$.next('Make Logo must be an image file.')
      setTimeout(()=>{
        this.errorImageType$.next('')
      }, 5000)
    }

  }

  removeImage() {
    this._imagePreview.removeImageUrl(this.previewImage.url);
    this.makeImage = undefined;
    this.previewImage = {
      url: '',
      id: '',
      alt: '',
    };
  }

  saveLogo() {
    if (CONSTANTS.IMAGE_FILE_EXT.includes(this.makeImage?.type as string)) {
      this.loadingImage = true;
      this._store.dispatch(
        makeActions.changeMakeLogo({
          id: this.id,
          makeLogo: this.makeImage as File,
        })
      );
      this.changeMakeLogoSub = this._store
        .select(makeSelector.changeMakeLogoSuccess)
        .subscribe((data) => {
          if (data) {
            window.location.href = `brands/make/${this.id}`;
            this.changeMakeLogoSub.unsubscribe();
          }
        });
    } 

    this.loadingImage = false;
  }

  getMakeLogo() {
    this._store.dispatch(makeActions.getMakeLogo({ id: this.id }));
    this.getMakeLogoSub = this._store
      .select(makeSelector.getMakeLogoUrl)
      .subscribe((data) => {
        if (data) {
          this.makeLogoUrl$ = data;
          this.getMakeLogoSub.unsubscribe();
        }
      });
  }

  ngOnInit() {
    this.getMakeLogo();
  }

  ngOnDestroy() {
    this.changeMakeLogoSub.unsubscribe();
    this.getMakeLogoSub.unsubscribe();
  }
}
