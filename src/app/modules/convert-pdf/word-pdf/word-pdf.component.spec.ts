import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordPdfComponent } from './word-pdf.component';

describe('WordPdfComponent', () => {
  let component: WordPdfComponent;
  let fixture: ComponentFixture<WordPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WordPdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WordPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
