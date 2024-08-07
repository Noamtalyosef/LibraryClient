import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { BookComponent } from './books/book/book.component';
import { BooksComponent } from './books/books.component';
//import { AuthorComponent } from './authors/author/author.component';
import { AuthorsComponent } from './authors/authors.component';
import { provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditBookModal } from './books/edit-book-modal/edit-book-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { EditAuthorModalComponent } from './authors/edit-author-modal/edit-author-modal.component'
import { BooksOfAuthorComponent } from './authors/books-of-author/books-of-author.component';
import { CreateAuthorComponent } from './authors/create-author/create-author.component';
import { CreateBookComponent } from './books/create-book/create-book.component';
import { LoginComponent } from './login/login.component';
import { BookPhotoComponent } from './books/book-photo/book-photo.component';









@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    AuthorsComponent,
    NavbarComponent,
    CreateBookComponent,
    LoginComponent,
    BookPhotoComponent

  
    
   
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    CommonModule,
    NgbModule,
    EditBookModal,
    FormsModule,
    ReactiveFormsModule,
    EditAuthorModalComponent,
    BooksOfAuthorComponent,
    CreateAuthorComponent
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient()
    
    
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
