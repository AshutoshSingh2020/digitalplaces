import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfConvertRoutingModule } from './pdf-convert-routing.module';
import { PdfWordComponent } from './pdf-word/pdf-word.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PdfWordComponent
  ],
  imports: [
    CommonModule,
    PdfConvertRoutingModule,
    SharedModule
  ]
})
export class PdfConvertModule { }
