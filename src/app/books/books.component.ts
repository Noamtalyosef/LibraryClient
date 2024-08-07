import { HttpClient } from '@angular/common/http';
import { Component,  Input,  OnDestroy,  OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { IBook } from '../models/IBook';
import { IAuthor } from '../models/IAuthor';
import { AuthorService } from '../services/author.service';
import { IPublisher } from '../models/IPublisher';
import { Router } from '@angular/router';
import { SignalRService } from '../services/signal-r.service';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../environments/environment.development';




@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit,OnDestroy {

  private bookService : BookService;
  private authorService : AuthorService;
  private signalRBookAddedSubscription! : Subscription;
  private signalRBookDeletedSubscription! : Subscription;
  private signalRObservableBookAdded: Observable<any> =  new Observable;
  private signalRObservableBookDeleted: Observable<any> =  new Observable;
   books! : IBook[];
   searchBooks! : IBook[];
   allAuthors! : IAuthor [];
   allPublishers! : IPublisher[];
   orderBy: string = 'year';
   @Input() searchTerm : string = '';
   basePhotosUrl = environment.booksPhotosBaseUrl;
   baseCopysUrl = environment.booksCopsBaseUrl;
   
   constructor( bookService : BookService, authorService : AuthorService, private router : Router, private signalr : SignalRService)
   {
    this.bookService = bookService;
    this.authorService = authorService;
    
    
   }

  ngOnDestroy(): void {
    
    if(this.signalRBookAddedSubscription)
    {
      this.signalRBookAddedSubscription.unsubscribe();
    }
    if(this.signalRBookDeletedSubscription)
    {
      this.signalRBookDeletedSubscription.unsubscribe();
    }
  }

 async ngOnInit() {
   
  this.books = await this.bookService.getBooks() ;
  this.searchBooks = JSON.parse(JSON.stringify(this.books));
  this.allAuthors = await this.authorService.getAuthors();
  this.allPublishers = await this.bookService.getPublishers();
  this.sortBooks();
  this.signalr.startConnection();

  this.signalRObservableBookAdded = this.signalr.newBook;
    this.signalRBookAddedSubscription =  this.signalRObservableBookAdded.subscribe(async  (newBooksIds : number []) =>
      {
        
          if (newBooksIds.length > 0) {
            await this.handleNewBooks(newBooksIds);
          }
      })

    this.signalRObservableBookDeleted = this.signalr.deletedBook;
    this.signalRBookDeletedSubscription = this.signalRObservableBookDeleted.subscribe(async (deletedBookId : number)=>{
     
      if(deletedBookId!)
      {
        console.log("in book service listen :",deletedBookId)
       this.handeleBookDeleted(deletedBookId)
      }
    })

  }

   handeleBookDeleted(deletedBookId : number)
  {
    this.books = this.books.filter(b=>b.id != deletedBookId )
    this.searchBooks = this.books.map(book=>({...book}));
  }

  async handleNewBooks(newBooksIds : number[] ) 
  {
    
    var newBooks = await this.bookService.getBooksById(newBooksIds);
    newBooks.forEach(newBook => {
      const isBookInList = this.searchBooks.some(book => book.id === newBook.id);
      if(!isBookInList)
      {
        this.books.push(newBook);
      }
       
    })
    this.searchBooks = this.books.map(book=>({...book}));
  }

  onSearch()
  {
    this.searchTerm = this.searchTerm.toLowerCase();
    this.searchBooks = this.books.map(book=>({...book}));
    
    this.searchBooks = this.searchBooks.filter(book => 
      book.name.toLowerCase().includes(this.searchTerm) ||
      book.authors.some(author => 
        `${author.firstName.toLowerCase()} ${author.lastName.toLowerCase()}`.includes(this.searchTerm)
      )
    );
  }

  async onDeleteBook(bookToDelete : IBook) : Promise<any>
  {
    let isDeleted = await this.bookService.Delete(bookToDelete);
    isDeleted ? alert('book deleted successfully') : alert('book deletetion faild');
  }

  onOrderByChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.orderBy = selectElement.value;
    this.sortBooks();
  }

  onCreateBook(){
    this.router.navigate(["/createBook"]);
  }

  sortBooks()
  {
    this.searchBooks.sort((a, b) => {
      if (this.orderBy === 'year'){
        return a.yearOfPublish - b.yearOfPublish; 
      } else if (this.orderBy === 'name') {
        return a.name.localeCompare(b.name); 
      }
      return 0; 
    });
  }



}
