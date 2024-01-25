import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-pdf-word',
  templateUrl: './pdf-word.component.html',
  styleUrls: ['./pdf-word.component.scss']
})
export class PdfWordComponent implements OnInit {
  pdfForm!: FormGroup;
  apiUrl = 'http://localhost:4000/api/pdf-to-word';

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.pdfForm = this.fb.group({
      pdf: [null]
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('pdf', file);

      this.http.post(this.apiUrl, formData, { responseType: 'blob' }).subscribe({
        next: (blob: Blob) => {
          saveAs(blob, 'converted.docx');

          // console.log(data);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
        }
      });
    }
  }
}
