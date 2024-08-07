import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAuthor } from '../../models/IAuthor';
import { IBook } from '../../models/IBook';
import { BookService } from '../../services/book.service';
import { IPublisher } from '../../models/IPublisher';
import { AuthorService } from '../../services/author.service';
import { EditBookModal } from '../../books/edit-book-modal/edit-book-modal.component';


@Component({
 
  selector: 'app-books-of-author',
  standalone: true,
  templateUrl: './books-of-author.component.html',
  imports: [NgbDatepickerModule, ReactiveFormsModule,CommonModule,EditBookModal],
  styleUrl: './books-of-author.component.css'
})
export class BooksOfAuthorComponent implements OnInit {

	bookService : BookService;
	authorService : AuthorService;
	 allAuthors! : IAuthor[];
	 allPublishers! : IPublisher[];

constructor( bookService : BookService, authorService : AuthorService) 
{
	this.authorService = authorService;
	this.bookService = bookService;
}


 async ngOnInit(): Promise<any> {
    this.allAuthors = await this.authorService.getAuthors();
	this.allPublishers = await this.bookService.getPublishers();
  }

  private modalService = inject(NgbModal);
  closeResult = '';
  @Input() books! : IBook[];


  open(content: TemplateRef<any>) {
		
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {this.closeResult = `Closed with: ${result}`;}
		);
	}

	async deleteBook(book : IBook)
	{
        await this.bookService.Delete(book);
	    this.books = this.books.filter(b=>b.id != book.id);

	}
}


