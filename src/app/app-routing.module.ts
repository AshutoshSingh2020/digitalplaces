import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PdfToImageComponent } from './modules/pdf-to-image/pdf-to-image.component';

const routes: Routes = [
{
  path:'',
  component:MainComponent,
  children:[
          {
            path:'',
            loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)
          },
          {
            path:'index',
            redirectTo:'',
            pathMatch:'full',
            loadChildren:()=>import('./modules/home/home.module').then(m=>m.HomeModule)
          },
          {
            path:'image-crawler',
            loadChildren:()=>import('./modules/image-crawler/image-crawler.module').then( m=> m.ImageCrawlerModule)
          },
          { path: 'pdf-to-image', component: PdfToImageComponent },
          {
            path:'pdf-merge',
            loadChildren:()=>import('./modules/pdf-merge/pdf-merge.module').then(m=>m.PdfMergeModule),
          },
          {
            path:'pdf-split',
            loadChildren:()=>import('./modules/pdf-split/pdf-split.module').then(m=>m.PdfSplitModule),
          },
          {
            path:'pdf-rotate',
            loadChildren:()=>import('./modules/pdf-rotate/pdf-rotate.module').then(m=>m.PdfRotateModule),
          },
          {
            path:'pdf-remove',
            loadChildren:()=>import('./modules/pdf-remove-page/pdf-remove-page.module').then(m=>m.PdfRemovePageModule),
          },
          {
            path:'pdf-extract',
            loadChildren:()=>import('./modules/pdf-extract/pdf-extract.module').then(m=>m.PdfExtractModule),
          }
         
        
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
