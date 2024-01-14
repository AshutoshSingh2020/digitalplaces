import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PdfExtractComponent } from './pdf-extract.component';

const routes: Routes = [
  {
    path:'',
    component:PdfExtractComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfExtractRoutingModule { }
