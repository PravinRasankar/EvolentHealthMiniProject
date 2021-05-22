import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudOprationsService {

  constructor(private _http:HttpClient) { }

  getContact(){
    return this._http.get("http://localhost:3000/contacts")
  }
  addContact(contact: any){
    return this._http.post("http://localhost:3000/contacts",contact)
  }
  updateContact(contact:any){
    return this._http.put("http://localhost:3000/contacts/"+contact.id,contact)
  }
  deleteContact(contact:any){
    return this._http.delete("http://localhost:3000/contacts/"+contact.id)
  }
}
