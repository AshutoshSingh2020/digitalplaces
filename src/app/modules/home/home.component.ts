import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  homeData:any[]=[
    {image:'https://ezytool.com/assets/img/merge.svg',title:'Merge Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-merge'},
    {image:'https://ezytool.com/assets/img/pdftoimg.svg',title:'PDF To Image',body:'Combine Pdf in easiest way on in the order you want merger available.', routerlink:'/pdf-to-image'},
    {image:'https://ezytool.com/assets/img/merge.svg',title:'Image Crawling',body:'Image Fetch from any live website',routerlink:'/image-crawler'},
    {image:'https://ezytool.com/assets/img/pdftoimg.svg',title:'Doc To PDF',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/convert-pdf'},
    {image:'https://ezytool.com/assets/img/ocr.svg',title:'Split Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-split'},
    {image:'https://ezytool.com/assets/img/merge.svg',title:'Rotate Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-rotate'},
    {image:'https://ezytool.com/assets/img/emi-calculate.png',title:'Remove Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-remove'},
    {image:'https://ezytool.com/assets/img/merge.svg',title:'PDF to Word',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-convert'},
    // {image:'https://ezytool.com/assets/img/ocr.svg',title:'Merge Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-split'},
    // {image:'https://ezytool.com/assets/img/pdftoimg.svg',title:'Solid Pdf',body:'Combine Pdf in easiest way on in the order you want merger available.',routerlink:'/pdf-split'},

  ];
  
  searchTerm: string = '';
  
    get filteredData(): any[] {
      return this.homeData.filter(item => item.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }

}