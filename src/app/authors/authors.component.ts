import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorService } from '../services/author.service';
import { IAuthor } from '../models/IAuthor';
import { Observable, Subscription } from 'rxjs';
import { SignalRService } from '../services/signal-r.service';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.css'
})
export class AuthorsComponent implements OnInit,OnDestroy{

authorService : AuthorService;
authors! : IAuthor[];
searchAuthors! : IAuthor[];
private signalRAuthorAddedSubscription! : Subscription;
private signalRAuthorDeletedSubscription! : Subscription;
private signalRAuthorAddedObservable: Observable<any> =  new Observable;
private signalRAuthorDeletedObservable: Observable<any> =  new Observable;
searchTerm : string = '';
orderBy : string = 'year';


constructor(authorService : AuthorService , private signalr : SignalRService) {
 this.authorService = authorService;
}

  ngOnDestroy(): void {
    if(this.signalRAuthorAddedSubscription)
      {
        this.signalRAuthorAddedSubscription.unsubscribe();
      }
      if(this.signalRAuthorDeletedSubscription)
      {
        this.signalRAuthorDeletedSubscription.unsubscribe();
      }
  }


 async ngOnInit() {
    this.authors = await this.authorService.getAuthors();
    this.searchAuthors = JSON.parse(JSON.stringify(this.authors));
     this.sortAuthors();
     this.signalr.startConnection();

     this.signalRAuthorAddedObservable = this.signalr.newAuthor;
     this.signalRAuthorAddedSubscription = this.signalRAuthorAddedObservable.subscribe( async (newAuthorsIds : number [])=>{
      if(newAuthorsIds.length > 0)
      {
       await this.handleNewAuthors(newAuthorsIds);
      }
     })

     this.signalRAuthorDeletedObservable = this.signalr.deletedAuthor;
     this.signalRAuthorDeletedSubscription = this.signalRAuthorDeletedObservable.subscribe( async (deletedAuthorId : number)=>{
      if(deletedAuthorId)
      {
         this.handeleDeletedAuthor(deletedAuthorId);
      }
     })
  }

  handeleDeletedAuthor(deletedAuthorId : number)
 {
  this.authors = this.authors.filter(a=> a.id != deletedAuthorId)
  this.searchAuthors = this.authors.map(author => ({ ...author }));
 }

  async handleNewAuthors(newAuthorsIds : number [])
  {
    
   var newAuthors = await this.authorService.getAuthorsById(newAuthorsIds);
   newAuthors.forEach(author => {
    this.authors.push(author);
   })
   this.searchAuthors = JSON.parse(JSON.stringify(this.authors));
  }


 async onDeleteAuthor(id : number) : Promise<any> 
{
 let isdeleted = await this.authorService.DeleteAuthor(id);
 isdeleted ? alert("author deleted successfully") : alert("author deletion faild")
 this.authors = this.authors.filter(author => author.id !== id);
 this.searchAuthors = this.authors.map(author => ({ ...author }));
}

onOrderByChange(event : Event) : any{
  const selectElement = event.target as HTMLSelectElement;
  this.orderBy = selectElement.value;
  this.sortAuthors();
}


onSearch()
{
  this.searchTerm = this.searchTerm.toLowerCase();
  this.searchAuthors = this.authors.map(author => ({ ...author }));
  
  this.searchAuthors = this.searchAuthors.filter(author => 
    author.firstName.toLowerCase().includes(this.searchTerm) ||
    author.books.some(book => 
      `${book.name.toLowerCase()}`.includes(this.searchTerm)
    )
  );

}

sortAuthors()
{
  this.searchAuthors.sort((a, b) => {
    if (this.orderBy === 'year') {
      return a.yearOfBirth - b.yearOfBirth; 
    } else if (this.orderBy === 'name') {
      return a.firstName.localeCompare(b.firstName); 
    }
    return 0; 
  });
}
}

