import { Component, inject, Input, OnInit, TemplateRef } from '@angular/core';

import { ModalDismissReasons, NgbActiveModal, NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IAuthor } from '../../models/IAuthor';

import { AuthorService } from '../../services/author.service';

import { ICity } from '../../models/ICity';


@Component({
  selector: 'edit-author-modal',
  standalone: true,
  templateUrl: './edit-author-modal.component.html',
	imports: [NgbDatepickerModule, ReactiveFormsModule,CommonModule],
  styleUrl: './edit-author-modal.component.css'
})
export class EditAuthorModalComponent implements OnInit {

  private modalService = inject(NgbModal);
	closeResult = '';
  cloneAuthor! : IAuthor;
  @Input() author! : IAuthor;
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
    this.cloneAuthor = JSON.parse(JSON.stringify(this.author));
    this.editAuthorForm = this.fb.group({
    firstName : [this.cloneAuthor.firstName,Validators.required],
    lastName : [this.cloneAuthor.lastName,Validators.required],
    yearOfBirth : [this.cloneAuthor.yearOfBirth,Validators.required],
    city : [this.cloneAuthor.city.id,Validators.required]
    });
  }


  open(content: TemplateRef<any>) {
		
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {this.closeResult = `Closed with: ${result}`;}
		);
	}

 async onSubmit(event : Event)
  {
    this.author.firstName = this.editAuthorForm.controls['firstName'].value,
    this.author.lastName = this.editAuthorForm.controls['lastName'].value;
    this.author.yearOfBirth = this.editAuthorForm.controls['yearOfBirth'].value;
    this.author.city = this.allCitys.filter(c => c.id == this.editAuthorForm.controls['city'].value)[0];

    await this.authorsService.updateAuthor(this.author);
    this.modalService.dismissAll();
  }

  close()
  {
    this.reInitForm()
    this.modalService.dismissAll();
  }
}
