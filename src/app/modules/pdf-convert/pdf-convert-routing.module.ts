import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfWordComponent } from './pdf-word/pdf-word.component';

const routes: Routes = [
  {
    path:'',
    component:PdfWordComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfConvertRoutingModule { }
