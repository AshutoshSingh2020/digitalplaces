import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePdfComponent } from './image-pdf.component';

describe('ImagePdfComponent', () => {
  let component: ImagePdfComponent;
  let fixture: ComponentFixture<ImagePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImagePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
