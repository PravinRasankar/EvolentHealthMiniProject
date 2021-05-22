import { formatCurrency } from '@angular/common';
import { Component } from '@angular/core';
import { CrudOprationsService } from './crud-oprations.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EvolentHealthProject-PravinRasankar';
  allContactDetail: any;
  isEdit:boolean = false;
  oldContactObj:any
  contactObj:any = {
    "firstName": "",
    "lastName": "",
    "email": "",
    "phoneNumber": "",
    "status": "",
    "id": ""
  }
  errorFound:Boolean = false;
  constructor(private crudOprationsService:CrudOprationsService){}

  ngOnInit(){
    this.getLatestContacts()
  }
  
  getLatestContacts(){
    this.crudOprationsService.getContact().subscribe((response)=>{
      this.allContactDetail = response;
    })
  }

  addNewContact(formObj:any){
    this.errorFound = false;
    Object.keys(this.contactObj).forEach((item)=>{
      if(this.contactObj[item] == ''){
        $('#'+item+'Error').css('display','block');
        this.errorFound = true;
      }
      else{
        $('#'+item+'Error').css('display','none');
      }
    })
    if(this.errorFound){return ;}
    
    this.crudOprationsService.addContact(formObj).subscribe((response)=>{
      this.getLatestContacts()
      this.contactObj =  {
        "firstName": "",
        "lastName": "",
        "email": "",
        "phoneNumber": "",
        "status": "",
        "id": ""
      }
      alert('Contact Added successfully.')
      Object.keys(this.contactObj).forEach((item)=>{
        $('#'+item+'Error').css('display','block');
        this.errorFound = false;
    })
    })
  }

  editContact(contact:any){
    this.isEdit = true;
    this.contactObj = contact;
    this.oldContactObj = contact;
  }

  updateContact(){
    this.errorFound = false;
    Object.keys(this.contactObj).forEach((item)=>{
      if(this.contactObj[item] == ''){
        $('#'+item+'Error').css('display','block');
        this.errorFound = true;
      }
      else{
        $('#'+item+'Error').css('display','none');
      }

    })
    if(this.errorFound){return ;}
    this.isEdit = !this.isEdit;
    this.crudOprationsService.updateContact(this.contactObj).subscribe(()=>{
      this.getLatestContacts();
      this.contactObj =  {
        "firstName": "",
        "lastName": "",
        "email": "",
        "phoneNumber": "",
        "status": "",
        "id": ""
      }
      alert('Contact Updated Successfully.')
      Object.keys(this.contactObj).forEach((item)=>{
          $('#'+item+'Error').css('display','block');
          this.errorFound = false;
      })
    })
  }
  deleteContact(contact:any){
    this.crudOprationsService.deleteContact(contact).subscribe(()=>{
      console.log("deleted")
      this.getLatestContacts();
      alert('Contact Deleted Successfully.')
    })
  }
}
