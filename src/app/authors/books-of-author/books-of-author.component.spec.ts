import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksOfAuthorComponent } from './books-of-author.component';

describe('BooksOfAuthorComponent', () => {
  let component: BooksOfAuthorComponent;
  let fixture: ComponentFixture<BooksOfAuthorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksOfAuthorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksOfAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
