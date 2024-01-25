import { Component } from '@angular/core';
import * as JSZip from 'jszip';
import * as Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { jsPDF } from 'jspdf';
import * as PizZip from 'pizzip';
// import 'jspdf-autotable'
// import * from 'html2pdf'
declare const html2pdf: any; 
@Component({
  selector: 'app-word-pdf',
  templateUrl: './word-pdf.component.html',
  styleUrl: './word-pdf.component.scss'
})
export class WordPdfComponent  {
  ngOnInit(): void {
    
  }
  private wordFile: File | undefined;

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.wordFile = files[0];
    }
  }

  convertToPdf(): void {
    if (!this.wordFile) {
      console.error('No Word file selected.');
      return;
    }
  
    const reader = new FileReader();
  
    reader.onload = (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const uint8Array = new Uint8Array(arrayBuffer);
  
      // Create a new instance of Docxtemplater
      const doc = new Docxtemplater();
      doc.loadZip(new PizZip(uint8Array));
  
      // Extract text content from the Word document
      const textContent = doc.getFullText();
  
      // Split the text content into words
      const words = textContent.split(/\s+/);
  
      // Create a new instance of jsPDF
      const pdf = new jsPDF();
  
      // Set font size
      pdf.setFontSize(12);
  
      // Use autoTable for dynamic text layout and automatic page breaks
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
  
      let xPosition = margin;
      let yPosition = margin;
  
      // Loop through each word
      while (words.length > 0) {
      const word = words.shift();
        
  // Ensure word is a non-undefined string before processing
  if (typeof word === 'string') {
    const line = pdf.splitTextToSize(word, pageWidth - 2 * margin);

    // Check if adding this line will exceed the page height
    const textHeight = pdf.getTextDimensions(line[0]).h;
    const width = pdf.getTextDimensions(line[0]).w + 1;
    if (yPosition + textHeight > pageHeight - margin) {
      pdf.addPage(); // Move to the next page
      yPosition = margin;
    }

    // Add the word to the current line
    pdf.text(line[0], xPosition, yPosition);
    if(xPosition>(pageWidth-50)){
      yPosition += textHeight;
      xPosition = 10;

    }else{
      xPosition += width;

    }
   

    // Move to the next line if needed
    if (line.length > 1) {
      pdf.addPage(); // Move to the next page
      yPosition = margin;
      pdf.text(line.slice(1).join(' '), xPosition, yPosition);
      yPosition += pdf.getTextDimensions(line[1]).h;
    }
  }
}
  
      // Save the PDF as a blob
      const pdfBlob = pdf.output('blob');
  
      // Save the blob as a file
      saveAs(pdfBlob, 'converted_document.pdf');
    };
  
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };
  
    reader.readAsArrayBuffer(this.wordFile);
  }
  
}
