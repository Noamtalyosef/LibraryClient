import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { CreateBookComponent } from './books/create-book/create-book.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.guard';

const routes : Routes = [
  { path: 'books', component: BooksComponent ,canActivate : [AuthGuard]},
  { path: 'authors', component: AuthorsComponent ,canActivate : [AuthGuard] },
  {path : 'createBook', component : CreateBookComponent ,canActivate : [AuthGuard]},
  {path : 'login',component: LoginComponent},
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: '**', redirectTo: '/books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
