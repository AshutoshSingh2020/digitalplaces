import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChooseFileComponent } from './choose-file/choose-file.component';
import { ViewImagesComponent } from './view-images/view-images.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DragAndDropDirective } from './drag-and-drop-directive/drag-and-drop.directive';
import { FeatherModule } from 'angular-feather';
import * as all from 'angular-feather/icons';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, DragDropModule} from '@angular/cdk/drag-drop';
const icons = {
 ...all,
};
@NgModule({
  declarations: [
    ChooseFileComponent,
    ViewImagesComponent,
    DragAndDropDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
   DragDropModule,
    // FeatherModule.pick(icons),
CdkDropList,
CdkDrag,
  
    MatRippleModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ChooseFileComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PdfViewerModule,
    CdkDropList,
CdkDrag,
    // FeatherModule,
    MatRippleModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDialogModule,
    MatMenuModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
