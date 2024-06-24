import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService } from 'primeng/api';
import { AccordionModule } from 'primeng/accordion';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  imports: [
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    CheckboxModule,
    CommonModule,
    ButtonModule,
    TableModule,
    CardModule,
    InputTextModule,
    ReactiveFormsModule,
    FileUploadModule,
    DialogModule,
    AccordionModule,
    CalendarModule,
    PaginatorModule
  ],
  exports: [
    ToastModule,
    ConfirmDialogModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    TableModule,
    CardModule,
    InputTextModule,
    FileUploadModule,
    DialogModule,
    AccordionModule,
    CalendarModule,
    PaginatorModule
  ],
  providers: [ConfirmationService],
})
export class DesignModule {}
