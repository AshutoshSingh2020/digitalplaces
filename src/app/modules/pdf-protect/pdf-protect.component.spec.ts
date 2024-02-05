import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfProtectComponent } from './pdf-protect.component';

describe('PdfProtectComponent', () => {
  let component: PdfProtectComponent;
  let fixture: ComponentFixture<PdfProtectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PdfProtectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfProtectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
