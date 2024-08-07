
import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { firstValueFrom} from 'rxjs';
import { IBook } from '../models/IBook';
import { environment } from '../../environments/environment.development';
import { IPublisher } from '../models/IPublisher';
import { INewBook } from '../models/INewBook';




@Injectable({
  providedIn: 'root'
})
export class BookService {

  
  private  http : HttpClient;
  private baseUrl : string = environment.booksApiUrl
  

  constructor( http : HttpClient) {
    this.http = http;
   }

   getBooks() : Promise<IBook[]>{
    console.log("in get books by id")
    return firstValueFrom(this.http.get<any>(this.baseUrl + 'GetBooks'));
   }
   getBooksById(booksIds : number[]) : Promise<IBook[]>{
    return firstValueFrom(this.http.post<any>(this.baseUrl + 'GetBooksById',booksIds));
   }

   Delete(book : IBook) : Promise<any>{
    return firstValueFrom(this.http.post<any>(this.baseUrl + `DeleteBook`,book)); 
   }

   updateBook(book : IBook, photoFile : File, copyFile : File) : Promise<any>
   {
    const formData = new FormData();
    formData.append('book', JSON.stringify(book));
    formData.append('bookFiles', copyFile,copyFile.name);
    formData.append('bookFiles', photoFile,photoFile.name);
    

    return firstValueFrom(this.http.patch<any>(this.baseUrl + `Update`,formData)); 
   }

   getPublishers() : Promise<IPublisher[]>
   {
    return firstValueFrom(this.http.get<any>(this.baseUrl+'GetPublishers'))
   }

   createBook(newBook : INewBook) : Promise<any>
   {
    console.log("before post:",newBook)

    const formData = new FormData();
    
    formData.append('book', JSON.stringify(newBook.book));
    formData.append('existingAuthorsIds', JSON.stringify(newBook.existingAuthorsIds));
    formData.append('newAuthors', JSON.stringify(newBook.newAuthors));
    formData.append('bookFiles', newBook.bookPicture, newBook.bookPicture.name);
    formData.append('bookFiles', newBook.bookCopy, newBook.bookCopy.name);


    return firstValueFrom(this.http.post<any>(this.baseUrl+'CreateBook',formData))
   }

   deletePhoto(book : IBook) : Promise<any>
   {
      return firstValueFrom(this.http.post<any>(this.baseUrl+'DeletePhoto',book))
   }

   
}
