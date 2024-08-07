import { Component, Input, OnInit } from '@angular/core';
import { IBook } from '../../models/IBook';
import { BookService } from '../../services/book.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-book-photo',
  templateUrl: './book-photo.component.html',
  styleUrl: './book-photo.component.css'
})
export class BookPhotoComponent implements OnInit {
  
 @Input() book! : IBook 
 showMinus = false;
 noPicture = false
 noPicturePath = "---.png";
 basePhotosUrl =  environment.booksPhotosBaseUrl;


 constructor( private bookService :  BookService)  {
   
 }
  ngOnInit(): void {
   if(this.book.picturePath == this.noPicturePath)
   {
    this.noPicture = true;
   }
  }



 async onPhotoDeleted() 
 {
   await this.bookService.deletePhoto(this.book);
   this.book.picturePath = this.noPicturePath;
 }


}
