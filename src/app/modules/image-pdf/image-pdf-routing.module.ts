import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImagePdfComponent } from './image-pdf.component';

const routes: Routes = [
  {
    path:'',
    component:ImagePdfComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagePdfRoutingModule { }
