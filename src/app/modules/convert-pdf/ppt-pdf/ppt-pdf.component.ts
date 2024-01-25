import { Component } from '@angular/core';
// import * as officegen from 'officegen';
import { saveAs } from 'file-saver'
@Component({
  selector: 'app-ppt-pdf',
  templateUrl: './ppt-pdf.component.html',
  styleUrl: './ppt-pdf.component.scss'
})
export class PptPdfComponent {
  convertToPdf(powerpointFile: File): void {
    // const pptx = officegen('pptx');

    // Load the PowerPoint file
    // pptx.load(pptx.toBuffer(powerpointFile));

    // // Create a PDF stream
    // const pdfBuffer = pptx.toBuffer();

    // // Save the PDF file
    // const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
    // saveAs(pdfBlob, 'converted.pdf');
  }
}
