import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PDFDocument, degrees } from 'pdf-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-pdf-split',
  templateUrl: './pdf-split.component.html',
  styleUrls: ['./pdf-split.component.scss']
})
export class PdfSplitComponent {
  // selectedFile: File | null = null;
  pageRange: string = '';
  // splitPages: PDFPage[] = [];

  seprate:boolean = false;

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // async splitPDF(): Promise<void> {
  //   if (!this.selectedFile) {
  //     console.error('Please choose a PDF file.');
  //     return;
  //   }

  //   const fileBuffer = await this.readFile(this.selectedFile);
  //   const pdfBytes = new Uint8Array(fileBuffer);

  //   const pdfDoc = await PDFDocument.load(pdfBytes);

  //   if (this.pageRange.trim() === '') {
  //     console.error('Please provide a valid page range.');
  //     return;
  //   }

  //   const [startPage, endPage] = this.pageRange.split(',').map(Number);

  //   if (isNaN(startPage) || isNaN(endPage) || startPage < 1 || endPage > pdfDoc.getPageCount() || startPage > endPage) {
  //     console.error('Invalid page range.');
  //     return;
  //   }
  //   if(this.seprate){
  //     for (let page = startPage; page <= endPage; page++) {
  //       const newPdfDoc = await PDFDocument.create();
  //       const copiedPage = await newPdfDoc.copyPages(pdfDoc, [page - 1]);
  //       newPdfDoc.addPage(copiedPage[0]);

  //       const newPdfBytes = await newPdfDoc.save();
  //       this.downloadFile(newPdfBytes, `page_${page}.pdf`);
  //     }
  //   }else{
  //     const newPdfDoc = await PDFDocument.create();
  //     const pagesToCopy = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  //     const copiedPages = await newPdfDoc.copyPages(pdfDoc, pagesToCopy);
  //     copiedPages.forEach((page) => newPdfDoc.addPage(page));
  
  //     const newPdfBytes = await newPdfDoc.save();
  //     this.downloadFile(newPdfBytes, `pages_${startPage}_${endPage}.pdf`);

  //   }

  // }

  // private async readFile(file: File): Promise<ArrayBuffer> {
  //   return new Promise<ArrayBuffer>((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => resolve(event.target?.result as ArrayBuffer);
  //     reader.onerror = (event) => reject(event.target?.error);
  //     reader.readAsArrayBuffer(file);
  //   });
  // }

  // private downloadFile(data: Uint8Array, filename: string): void {
  //   const blob = new Blob([data], { type: 'application/pdf' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.href = url;
  //   a.download = filename;
  //   document.body.appendChild(a);
  //   this.link = a;
  //   a.click();
  //   document.body.removeChild(a);
  //   window.URL.revokeObjectURL(url);
  // }

  pdfMerge !:FormGroup;
  selectedFile!: File  ;
  selectedFile1!: File ;
  mergedPdf!:PDFDocument;
  pdfSrc:any;
  pdfPages:any;
   link:any;
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
      this.mergedPdfData = await this.mergePdfs(...pdfDataArray);
  
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
  
  async mergePdfs(...pdfDataArray: Uint8Array[]): Promise<Uint8Array> {
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
  async extractAllPages() {
    const pdfBytes = await this.mergedPdf.save();

    const originalPdfDoc = await PDFDocument.load(pdfBytes);
    const totalPages = originalPdfDoc.getPageCount();

    if (this.pageRange.trim() === '') {
      console.error('Please provide a valid page range.');
      return;
    }

    let [startPage, endPage] = this.pageRange.split(',').map(Number);

    if (isNaN(startPage) || isNaN(endPage) || startPage < 1 || endPage > originalPdfDoc.getPageCount() || startPage > endPage) {
      console.error('Invalid page range.');
      return;
    }
    if(this.seprate){
      for (let page = startPage-1; page <= endPage-1; page++) {
        const newPdfDoc = await PDFDocument.create();
        const copiedPage = await newPdfDoc.copyPages(originalPdfDoc, [page - 1]);
        newPdfDoc.addPage(copiedPage[0]);

        const newPdfBytes = await newPdfDoc.save();
        this.downloadFile(newPdfBytes, `page_${page}.pdf`);
      }
    }else{
      startPage -= 1;
      endPage -= 1;
      const newPdfDoc = await PDFDocument.create();
      let pagesToCopy = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
      console.log(pagesToCopy);
      const copiedPages = await newPdfDoc.copyPages(originalPdfDoc, pagesToCopy);
      copiedPages.forEach((page) => newPdfDoc.addPage(page));
  
      const newPdfBytes = await newPdfDoc.save();
      this.downloadFile(newPdfBytes, `pages_${startPage+1}_${endPage+1}.pdf`);

    }
  }

  // async downloadExtractedPdf(pdfBytes: Uint8Array, pageIndex: number) {
  //   const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  //   const link = document.createElement('a');
  //   link.href = URL.createObjectURL(blob);
  //   link.download = `extracted_page_${pageIndex + 1}.pdf`;
  //   link.click();
  // }
  
   private downloadFile(data: Uint8Array, filename: string): void {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    this.link = a;
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  afterLoadComplete(pdf: PDFDocumentProxy) {
  }
}
