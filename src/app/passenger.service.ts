import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

uri = "http://localhost:4000/v1/ride";

  constructor(private http: HttpClient) { }

  findAll(){
   
    return this.http.get(`${this.uri}/getrides`);
  }
}
