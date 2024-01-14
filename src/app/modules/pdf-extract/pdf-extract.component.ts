import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PDFDocument, degrees } from 'pdf-lib';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-pdf-extract',
  templateUrl: './pdf-extract.component.html',
  styleUrls: ['./pdf-extract.component.scss']
})
export class PdfExtractComponent implements OnInit{
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

    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const extractedPdfDoc = await PDFDocument.create();
      const [copiedPage] = await extractedPdfDoc.copyPages(originalPdfDoc, [pageIndex]);

      extractedPdfDoc.addPage(copiedPage);

      const extractedPdfBytes = await extractedPdfDoc.save();
      this.downloadExtractedPdf(extractedPdfBytes, pageIndex);
    }
  }

//  async downLoad(){
//     const blob = new Blob([this.mergedPdfData], { type: 'application/pdf' });
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'extract.pdf';
//     this.link = link.href;
//     link.click();
//   }
  async downloadExtractedPdf(pdfBytes: Uint8Array, pageIndex: number) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `extracted_page_${pageIndex + 1}.pdf`;
    link.click();
  }
  

  afterLoadComplete(pdf: PDFDocumentProxy) {
  }
}
