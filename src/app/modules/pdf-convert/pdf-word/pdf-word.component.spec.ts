import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfWordComponent } from './pdf-word.component';

describe('PdfWordComponent', () => {
  let component: PdfWordComponent;
  let fixture: ComponentFixture<PdfWordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfWordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
