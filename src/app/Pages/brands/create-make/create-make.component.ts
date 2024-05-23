import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImagePreview } from '../../../../utils/ImagePreview';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import { makeActions } from '../../../Store/Make/make.action';
import { ISaveMakes } from '../../../Data/Brand/Makes/SaveMakes';
import { makeSelector } from '../../../Store/Make/make.selector';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  delay,
  first,
  forkJoin,
  last,
  map,
  of,
  take,
  tap,
} from 'rxjs';
import { LocationService } from '../../../services/location/location.service';
import { MessageService } from 'primeng/api';
interface ISelect {
  name: string;
  code: string;
}

interface ICreateMakeForm {
  makeName: string;
  origin: string;
  yearFounded: number;
  company: string;
  file: File;
  errorMakeName: string;
  errorMakeNameBorder: boolean;
  errorOrigin: string;
  errorOriginBorder: boolean;
  previewImage: {
    url: string;
    id: string;
  };
}
@Component({
  selector: 'app-create-make',
  templateUrl: './create-make.component.html',
  styleUrl: './create-make.component.scss',
  providers: [MessageService],
})
export class CreateMakeComponent {
  formItems!: FormArray;
  formName: string = 'makeForms';
  error$ = new BehaviorSubject<string>('');
  makesSavedSub = new Subscription();
  errorSub = new Subscription();
  loading: boolean = false;
  countriesList$!: Observable<ISelect[]>;

  constructor(
    private _builder: FormBuilder,
    private _locationService: LocationService  ) {}
  makeFormGroup = this._builder.group({
    makeForms: this._builder.array<ICreateMakeForm[]>([]),
  });

  getCountries() {
    this.countriesList$ = this._locationService.getCountriesList().pipe(
      map((data) => {
        return data.map((x) => ({
          name: x.name,
          code: x.name,
        }));
      })
    );
  }

  ngOnInit(): void {
    this.getCountries();
  }
}
