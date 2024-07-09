import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../Store/app.state';
import {
  IExportModelsData,
  IGetModelPagination,
  IModelFilterForm,
} from '../../../Data/Brand/Model/GetModel';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';
import { modelActions } from '../../../Store/Model/model.action';
import { modelSelector } from '../../../Store/Model/model.selector';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableLazyLoadEvent } from 'primeng/table';
import { HandleQuery } from '../../../../utils/HandleQuery';
import { HandleResetPagination } from '../../../../utils/HandleResetPagination';
import { ISortField } from '../../../Data/IPagination';
import { IExportBody, IExportType } from '../../../Data/Common';
import { HandleDownload } from '../../../../utils/HandleDownload';

interface IIdsData {
  id: String;
  modelName: string;
}

@Component({
  selector: 'app-view-models',
  templateUrl: './view-models.component.html',
  styleUrl: './view-models.component.scss',
  providers: [MessageService, ConfirmationService],
})
export class ViewModelsComponent {
  constructor(
    private _store: Store<IAppState>,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private _handleQuery: HandleQuery,
    private _handleResetPagination: HandleResetPagination,
    private _handleDownload: HandleDownload,
    private _renderer: Renderer2,
    private _element: ElementRef<HTMLDivElement>,
    private _el: ElementRef
  ) {}
  idsData: IIdsData[] = [];
  modelsDataSub!: Subscription;
  modelsData$!: Observable<IGetModelPagination>;
  loading = false;
  verifyMakesResponse$!: Subscription;
  textSelectAll = true;
  selectAllSub = new Subscription();
  filterData: IModelFilterForm = {
    bodyType: []
  };
  init = true;
  sortFields: ISortField[] = [];
  exportData: IExportModelsData = {};
  exportType: IExportType = {
    exportAll: true,
    paginate: false,
  };
  exportTypeText = 'exportAll';
  exportSub!: Subscription;
  query!: any;
  bodyTypeText = {
    text:''
  };

  openStatusDialog(event: Event, requestType: string) {
    if (this.idsData.length > 0) {
      this.loading = true;
      const modelNames = this.idsData.map((x) => x.modelName);
      const ids: string[] = this.idsData.map((x) => x.id) as string[];

      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: `Are you sure u want to active the following models ${modelNames}`,
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: 'none',
        rejectIcon: 'none',
        rejectButtonStyleClass: 'p-button-text',
        accept: () => {
          this._store.dispatch(modelActions.verifyModels({ ids, requestType }));
          this.verifyMakesResponse$ = this._store
            .select(modelSelector.verifyModelsResponse)
            .subscribe((x) => {
              if (x) {
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmed',
                  detail: 'You have accepted',
                });
                this.idsData = [];
                this.textSelectAll = true;
                this._store.dispatch(modelActions.getModels({}));
                this.loading = false;
                this.selectAllSub.unsubscribe();
                this.verifyMakesResponse$.unsubscribe();
              }
            });
        },
        reject: () => {
          this.loading = false;
        },
      });
    }
  }

  handleCheckbox(data: IIdsData) {
    if (!this.idsData.some((item) => item.id === data.id)) {
      this.idsData.push(data);
    } else {
      const index = this.idsData.findIndex((item) => item.id === data.id);
      this.idsData.splice(index, 1);
    }
  }

  checkId(id: string) {
    return this.idsData.some((item) => item.id === id);
  }

  selectAll() {
    if (this.textSelectAll) {
      this.selectAllSub = this.modelsData$
        .pipe(
          map((data) =>
            data.data.map((x) => ({ id: x.id, modelName: x.modelName }))
          )
        )
        .subscribe((data2) => {
          this.idsData = [...data2];
          this.textSelectAll = false;
        });
    } else {
      this.idsData = [];
      this.textSelectAll = true;
    }
  }

  resetFilters() {
    this.init = true;
    this.filterData = {
      bodyType: []
    };
    this.bodyTypeText.text = 'fffff';

    this._handleResetPagination.execute(
      this._renderer,
      this._element,
      this._el
    );
    this.init = false;
  }

  getModels(event?: TableLazyLoadEvent) {
    let { query } = this._handleQuery.execute({
      filter: this.filterData,
      event,
    });
    this.query = query;
    if (this.init) {
      query.orderBy = {};
      query.orderBy['modelName'] = 'asc';
      this.init = false;
    }
    if(Object.keys(query.orderBy).length === 0){
      query.orderBy['modelName'] = 'asc';
    }
    this._store.dispatch(
      modelActions.getModels({
        filter: {
          ...query,
        },
      })
    );
    this.modelsData$ = this._store.select(modelSelector.modelsData);
  }

  checkExportType(type: string) {
    return type === this.exportType ? true : false;
  }

  handleExportType(type: string) {
    this.exportTypeText = type;
    if (type === 'exportAll') {
      this.exportType.exportAll = true;
      this.exportType.paginate = false;
    } else {
      this.exportType.paginate = true;
      this.exportType.exportAll = false;
    }
  }

  handleExport() {
    const cols: IExportBody[] = [];
    Object.keys(this.exportData).map((key) => {
      if (this.exportData[key as keyof IExportModelsData]) {
        cols.push({ key });
      }
    });
    this._store.dispatch(
      modelActions.expertModelsData({
        exportType: this.exportTypeText,
        columns: cols,
        filters: {
          ...this.query,
        },
      })
    );

    this.exportSub = this._store
      .select(modelSelector.exportModelDataDownload)
      .subscribe((blob) => {
        if (blob) {
          this._handleDownload.execute(blob, 'ExportModelData.xlsx');
          this.exportSub.unsubscribe();
        }
      });
  }

  handleRemoveBodyType(bodyTypeIndex: number) {
    if (this.filterData.bodyType) {
      const arr = [...this.filterData.bodyType];
      arr.splice(bodyTypeIndex, 1);
      this.filterData.bodyType = [...arr];
    }
  }

  handleBodyType(val: any) {
    if (val.value.trim() && !this.filterData.bodyType.includes(val.value)) {
      this.filterData.bodyType = [...this.filterData.bodyType, val.value];
    }
  }

  ngOnInit() {
    this.getModels();
  }

  ngOnDestroy() {
    this.verifyMakesResponse$?.unsubscribe();
    this.selectAllSub.unsubscribe();
  }
}
