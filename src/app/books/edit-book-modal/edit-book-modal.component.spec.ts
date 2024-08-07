import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookModal } from './edit-book-modal.component';

describe('EditBookModalComponent', () => {
  let component: EditBookModal;
  let fixture: ComponentFixture<EditBookModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBookModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
