import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPhotoComponent } from './book-photo.component';

describe('BookPhotoComponent', () => {
  let component: BookPhotoComponent;
  let fixture: ComponentFixture<BookPhotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookPhotoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
