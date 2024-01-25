import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PptPdfComponent } from './ppt-pdf.component';

describe('PptPdfComponent', () => {
  let component: PptPdfComponent;
  let fixture: ComponentFixture<PptPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PptPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PptPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
