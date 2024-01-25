import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImagePdfRoutingModule } from './image-pdf-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ImagePdfRoutingModule,
    SharedModule
  ]
})
export class ImagePdfModule { }
