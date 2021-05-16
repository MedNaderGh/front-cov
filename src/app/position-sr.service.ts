import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PositionSRService {

  constructor(private http: HttpClient) { 

  }

  SendPosition(lat,lng){
    return this.http.post("URL",lat,lng);  
  }

  ListRecommandation(){
    return this.http.get("url");

  }

}
