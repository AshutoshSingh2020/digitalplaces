import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvertPdfRoutingModule } from './convert-pdf-routing.module';
import { WordPdfComponent } from './word-pdf/word-pdf.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PptPdfComponent } from './ppt-pdf/ppt-pdf.component';


@NgModule({
  declarations: [
    WordPdfComponent,
    PptPdfComponent
  ],
  imports: [
    CommonModule,
    ConvertPdfRoutingModule,
    SharedModule
  ]
})
export class ConvertPdfModule { }
