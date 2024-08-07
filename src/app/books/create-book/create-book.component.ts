import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from '../../services/author.service';
import { IAuthor } from '../../models/IAuthor';
import { IPublisher } from '../../models/IPublisher';
import { BookService } from '../../services/book.service';
import { ICity } from '../../models/ICity';
import { INewBook } from '../../models/INewBook';
import { Router } from '@angular/router';
import { SignalRService } from '../../services/signal-r.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.css'
})
export class CreateBookComponent implements OnInit {

  bookForm! : FormGroup;
  allAuthors! : IAuthor[];
  allPublishers! : IPublisher[];
  allCitys! : ICity[];
  selectedPictureFile! : File;
  selectedCopyFile! : File;

  constructor(private fb: FormBuilder, private authorService : AuthorService, private bookService : BookService,  private router : Router  ) 
 {
    this.reInitForm();
 }


  async ngOnInit() {
    this.allAuthors = await this.authorService.getAuthors();
    this.allCitys = await this.authorService.getCitys();
    this.allPublishers = await this.bookService.getPublishers();
  }

  reInitForm()
  {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      yearOfPublish: ['', [Validators.required, Validators.min(0), Validators.max(2024)]],
      publisher: ['', Validators.required],
      copy: ['', Validators.required],
      picture: [, Validators.required],
      authors: [[], Validators.required],
      newAuthors: this.fb.array([])
    });
  }

  get newAuthors(): FormArray {
    
    return this.bookForm.get('newAuthors') as FormArray;
  }

  createAuthor(): FormGroup {
    return this.fb.group({
      firstName: [''],
      lastName: [''],
      yearOfBirth : [0],
      city : []
    });
  }

  addAuthor() {
    this.newAuthors.push(this.createAuthor());
  }

  removeAuthor(index: number) {
    this.newAuthors.removeAt(index);
  }

  onFilePictureSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedPictureFile = file;
    }
  }

  onFileCopySelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedCopyFile = file;
    }
  }



  async submit() {
      
    if(this.bookForm.invalid)
      {
        alert("please eneter a valid data")
        return;
      }
   

    const newBook : INewBook = 
    {
      book : { 
        id : 0,
        name : this.bookForm.controls['name'].value,
        yearOfPublish : this.bookForm.controls['yearOfPublish'].value,
        publisher : this.allPublishers.filter(p=> p.id ==this.bookForm.controls['publisher'].value )[0] ,
        copyPath : "",
        picturePath : "",
        authors : []
      },
      existingAuthorsIds : this.bookForm.controls['authors'].value,
      newAuthors : this.newAuthors.value,
      bookPicture : this.selectedPictureFile,
      bookCopy : this.selectedCopyFile
    }
    
      newBook.newAuthors.forEach(author =>{
       author.city = this.allCitys.filter(c => c.id == +author.city)[0]
      })
      

      newBook.existingAuthorsIds = newBook.existingAuthorsIds == null ? [] : newBook.existingAuthorsIds;
      
      await this.bookService.createBook(newBook);


      alert("book added successfully");
      this.reInitForm();
  }
  
  
}
