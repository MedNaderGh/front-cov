import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherServiceService {
  apiKey: 'b163713c7fa58211ef84e146524aa6e0';
  apiUrl: 'http://api.openweathermap.org/data/2.5';
  constructor(private http:HttpClient) {

   }

  
    getCurrentWeather(loc: string) {
      return this.http.get(`${this.apiUrl}/weather?q=${loc}&appid=${this.apiKey}`)
    }
  
}
