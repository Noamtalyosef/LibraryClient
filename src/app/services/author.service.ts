import { HttpClient } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { firstValueFrom} from 'rxjs';
import { IBook } from '../models/IBook';
import { environment } from '../../environments/environment.development';
import { IAuthor } from '../models/IAuthor';
import { ICity } from '../models/ICity';




@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  
  private  http : HttpClient;
  private baseUrl : string = environment.authorsApiUrl
  

  constructor( http : HttpClient) {
    this.http = http;
   }

   getAuthors() : Promise<IAuthor[]>{
    return firstValueFrom(this.http.get<any>(this.baseUrl + 'GetAuthors'));
   }

   getAuthorsById(booksIds : number[]) : Promise<IAuthor[]>{
    return firstValueFrom(this.http.post<any>(this.baseUrl + 'GetAuthorsById',booksIds));
   }

   getCitys() : Promise<ICity[]>
   {
    return firstValueFrom(this.http.get<any>(this.baseUrl + 'GetCitys'));
   }

   DeleteAuthor(id : number) : Promise<any>{
    return firstValueFrom(this.http.delete<any>(this.baseUrl + `DeleteAuthor?id=${id}`)); 
   }

   updateAuthor(author : IAuthor)
   {
    firstValueFrom(this.http.patch<any>(this.baseUrl + `Update`,author)); 
   }

   createAuthor(author : IAuthor)
   {
   
    firstValueFrom(this.http.post<any>(this.baseUrl + `Create`,author)); 
   }
  }
