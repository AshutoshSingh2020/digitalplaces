import { Component,ViewChildren, QueryList, ElementRef } from '@angular/core';
import { PDFDocument } from 'pdf-lib';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-image-pdf',
  standalone: true,
  imports: [],
  templateUrl: './image-pdf.component.html',
  styleUrl: './image-pdf.component.scss'
})
export class ImagePdfComponent {
  @ViewChildren('contentToConvert') contentToConvertList!: QueryList<ElementRef>;
  imageUrls: string[] = [];

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const imageUrl = URL.createObjectURL(file);
        this.imageUrls.push(imageUrl);
      }
    }
  }

  async convertToPdf() {
    if (this.imageUrls.length === 0) {
      console.error('No images selected.');
      return;
    }

    const pdfDoc = await PDFDocument.create();

    const contentList = this.contentToConvertList.toArray();

    for (let i = 0; i < Math.min(contentList.length, this.imageUrls.length); i++) {
      const content = contentList[i].nativeElement;
      const canvas = await html2canvas(content);
      const page = pdfDoc.addPage();
      const imgData = canvas.toDataURL('image/png');
      const imgBytes = this.dataURLToUint8Array(imgData);
      const img = await pdfDoc.embedPng(imgBytes);
      const margin = 20;
      const scale = Math.min(
        (page.getWidth() - 2 * margin) / img.width,
        (page.getHeight() - 2 * margin) / img.height
      );

      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (page.getWidth() - scaledWidth) / 2;
      const y = (page.getHeight() - scaledHeight) / 2;

      page.drawImage(img, {
        x: x + margin,
        y: y + margin,
        width: scaledWidth,
        height: scaledHeight,
      });
    }
    const pdfBytes = await pdfDoc.save();
    this.downloadPdf(pdfBytes, 'converted_images.pdf');
  }

  private dataURLToUint8Array(dataURL: string): Uint8Array {
    const base64 = dataURL.split(',')[1];
    return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  }

  private downloadPdf(pdfBytes: Uint8Array, fileName: string) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }
}
