import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfExtractRoutingModule } from './pdf-extract-routing.module';
import { PdfExtractComponent } from './pdf-extract.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PdfExtractComponent
  ],
  imports: [
    CommonModule,
    PdfExtractRoutingModule,
    SharedModule
  ]
})
export class PdfExtractModule { }
