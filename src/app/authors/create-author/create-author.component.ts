import { Component, EventEmitter, inject, Input, NgModule, OnInit, Output, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAuthor } from '../../models/IAuthor';

import { AuthorService } from '../../services/author.service';
import { ICity } from '../../models/ICity';


@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [NgbDatepickerModule,ReactiveFormsModule,CommonModule],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.css'
})
export class CreateAuthorComponent {

  private modalService = inject(NgbModal);
	closeResult = '';
  author ! : IAuthor;
  allCitys! : ICity[];
  authorsService : AuthorService;
  editAuthorForm! : FormGroup;
  
  constructor(authorsService : AuthorService, private fb : FormBuilder) {
   this.authorsService = authorsService;
    
  }
  async ngOnInit(){
    
    this.allCitys = await this.authorsService.getCitys();
    this.reInitForm();
  }

  reInitForm(){
    this.editAuthorForm = this.fb.group({
    firstName : [,Validators.required],
    lastName : [,Validators.required],
    yearOfBirth : [,[Validators.required, Validators.min(0), Validators.max(2023)]],
    city : [,Validators.required]
    });
  }


  open(content: TemplateRef<any>) {
		
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {this.closeResult = `Closed with: ${result}`;}
		);
	}

 async onSubmit(event : Event)
  {
    if(this.editAuthorForm.invalid)
    {
      alert("please enetr valid data");
      return;
    }

    const author : IAuthor =
    {
         id : 0 ,
         firstName : this.editAuthorForm.controls['firstName'].value,
         lastName : this.editAuthorForm.controls['lastName'].value,
         yearOfBirth :  this.editAuthorForm.controls['yearOfBirth'].value,
         city : this.allCitys.filter(c => c.id == this.editAuthorForm.controls['city'].value)[0],
         books : []
    };
    await this.authorsService.createAuthor(author);
    this.modalService.dismissAll();
    alert("added successfully")
  }

   
  close()
  {
    this.reInitForm()
    this.modalService.dismissAll();
  }
}
