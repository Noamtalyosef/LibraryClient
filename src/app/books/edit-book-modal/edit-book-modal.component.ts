import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IBook } from '../../models/IBook';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAuthor } from '../../models/IAuthor';
import { BookService } from '../../services/book.service';
import { IPublisher } from '../../models/IPublisher';
import { environment } from '../../../environments/environment.development';

@Component({
	selector: 'edit-book-modal',
	standalone: true,
	imports: [NgbDatepickerModule, ReactiveFormsModule,CommonModule],
	templateUrl: './edit-book-modal.component.html',
})
export class EditBookModal implements OnInit {

	private modalService = inject(NgbModal);
	closeResult = '';
	cloneBook! : IBook;
    @Input() book! : IBook;
	@Input() allAuthors! : IAuthor[];
	@Input() allPublishers! : IPublisher[];
	bookService! : BookService;
	photosBaseUrl : string = environment.booksPhotosBaseUrl;

	SelectedPhoto! : File;
	SelectedCopy! : File;


   editBookForm! :FormGroup;	
	constructor(bookService : BookService, private fb : FormBuilder) {
		this.bookService = bookService;
	}

	ngOnInit() {
		this.reInitForm()
	}

	reInitForm()
	{
        this.cloneBook = JSON.parse(JSON.stringify(this.book));
        this.editBookForm = this.fb.group({
			name: [this.cloneBook.name, Validators.required],
			authors: [this.cloneBook.authors, Validators.required],
			yearOfPublish: [this.cloneBook.yearOfPublish, [
			  Validators.required,
			  Validators.min(0),
			  Validators.max(2024),
			  Validators.pattern('^[0-9]{1,4}$')
			]],
			publisher: [this.cloneBook.publisher.id, Validators.required],
			copy: [, Validators.required],
			picture: [, Validators.required]
		})
	}

	open(content: TemplateRef<any>) {
		
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {this.closeResult = `Closed with: ${result}`;}
		);
	}

	closeModal()
	{
		this.reInitForm();
		this.modalService.dismissAll()
	}

  async onSubmit(): Promise<any> {

	if(!this.editBookForm.invalid)
	{
		if(this.SelectedCopy.type == "text/plain" && this.SelectedPhoto.type == "image/jpeg")
		{
			this.book.name = this.editBookForm.controls['name'].value;
			this.book.yearOfPublish = this.editBookForm.controls['yearOfPublish'].value;
			this.book.authors = this.editBookForm.controls['authors'].value;
			const publisherId = this.editBookForm.controls['publisher'].value;
			this.book.publisher =  this.allPublishers.filter(p => p.id == publisherId)[0];
	  
			await this.bookService.updateBook(this.book,this.SelectedPhoto,this.SelectedCopy);
			this.modalService.dismissAll();
		}
		else{
			alert("please choose valid files")
		}
	}
	else{
	   alert("please enetr a valid data")
	}
  }


  onFilePictureSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.SelectedPhoto = file;
    }
  }

  onFileCopySelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.SelectedCopy = file;
    }
  }
}