import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PDFDocument, degrees } from 'pdf-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { formatNumber } from '@angular/common';
@Component({
  selector: 'app-pdf-rotate',
  templateUrl: './pdf-rotate.component.html',
  styleUrls: ['./pdf-rotate.component.scss']
})
export class PdfRotateComponent implements OnInit {
  pdfMerge !:FormGroup;
  selectedFile!: File  ;
  selectedFile1!: File ;
  mergedPdf!:PDFDocument;
  pdfSrc:any;
  pdfPages:any;
   link!:string;
   downloadLink:boolean = false;
   mergedPdfData:any;
   rotationArray: { rotate: number; degree: number }[] = [];
   removeArray: any[] = [];
   constructor(private fb:FormBuilder,private http: HttpClient){
 
   }
  ngOnInit(): void {
    this.pdfMerge = this.fb.group({
      pdf:[""],
    })
  }

  async onFileSelected(event: any): Promise<void> {
    const files = event.map((e: any) => e.file as File);
  
    if (files.length === 0) {
      return;
    }
  
    const pdfDataArray: Uint8Array[] = [];
  
    for (const file of files) {
      const pdfData = await this.readFileAsArrayBuffer(file);
      pdfDataArray.push(new Uint8Array(pdfData));
    }
  
    try {
      this.mergedPdfData = await this.rotatePdf(...pdfDataArray);
  
      const blob = new Blob([this.mergedPdfData], { type: 'application/pdf' });
      const dataUrl = URL.createObjectURL(blob);
      this.pdfSrc = dataUrl;
     
    } catch (error) {
      console.error('Error merging PDFs:', error);
    }
  }
  
  
  async readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const arrayBuffer = (event.target.result as ArrayBuffer);
          resolve(arrayBuffer);
        } else {
          reject(new Error('Error reading file as ArrayBuffer.'));
        }
      };

      const blob = new Blob([file]);
      reader.readAsArrayBuffer(blob);
    });
  }
  
  async rotatePdf(...pdfDataArray: Uint8Array[]): Promise<Uint8Array> {
    try {
      
         this.mergedPdf = await PDFDocument.create();
    
        for (const pdfData of pdfDataArray) {
          let pdfDoc = await PDFDocument.load(pdfData);
          let pages = await this.mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
    
          for (let page of pages) {
            this.mergedPdf.addPage(page);
          }
        }


     
      this.pdfPages = this.mergedPdf.getPageIndices();

      
      const mergedPdfBytes = await this.mergedPdf.save();
      return mergedPdfBytes;
    } catch (error) {
      console.error('Error merging PDFs:', error);
      throw error;
    }
  }
 async rotatingPdf(){
    if (this.rotationArray.length > 0) {
      let pageIndicesToModify = this.rotationArray.map(item => item.rotate);
     
      let pagesToModify = await this.mergedPdf.copyPages(this.mergedPdf, pageIndicesToModify);
        console.log(pagesToModify);
      for (let i = 0; i < pagesToModify.length; i++) {
        let cpage = pagesToModify[i];
        let rotationInfo = this.rotationArray.find(item => item.rotate === pageIndicesToModify[i]);
    
        if (rotationInfo) {
          cpage.setRotation(degrees(rotationInfo.degree));
          let pageIndex = pageIndicesToModify[i];
          this.mergedPdf.removePage(pageIndex);
          this.mergedPdf.insertPage(pageIndex, pagesToModify[i]);
        }
      }
    }
  
 
    this.pdfPages = this.mergedPdf.getPageIndices();
      
    let mergedPdfBytes = await this.mergedPdf.save();
    this.downloadLink = true;
    this.mergedPdfData =  mergedPdfBytes;
  }


 async downLoad(){this
    const blob = new Blob([this.mergedPdfData], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'rotate.pdf';
    this.link = link.href;
    link.click();
  }
  
  rotatePage(index:number){
    let existingRotationIndex = this.rotationArray.findIndex(item => item.rotate === index);
    
    if (existingRotationIndex !== -1) {
      this.rotationArray[existingRotationIndex].degree = (this.rotationArray[existingRotationIndex].degree + 90) % 360;
    } else {
      this.addRotationInfo(index, 90);
    }
  }
  addRotationInfo(rotate: number, degree: number): void {
    this.rotationArray.push({ rotate,degree });
  }
 
  afterLoadComplete(pdf: PDFDocumentProxy) {
  }
  rotatesAllPages(){
    for(let item of this.pdfPages){
      this.rotatePage(item);
    }
  }
}


