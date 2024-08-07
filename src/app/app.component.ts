import { Component, OnInit } from '@angular/core';
import { BookService } from './services/book.service';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit
 {
  private bookService : BookService ;

  constructor(booksService : BookService, private signalRService :SignalRService) {
    this.bookService = booksService;
    
  }
  ngOnInit(): void {
   //this.signalRService.startConnection();
  }
  title = 'Library';
}
