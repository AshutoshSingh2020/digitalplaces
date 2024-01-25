import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordPdfComponent } from './word-pdf/word-pdf.component';

const routes: Routes = [
  {
    path:'',
    component:WordPdfComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvertPdfRoutingModule { }
