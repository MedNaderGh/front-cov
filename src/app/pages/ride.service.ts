import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import {
  NavController,
  MenuController,
  LoadingController,
} from "@ionic/angular";
import { Router } from "@angular/router";
import { User } from "./user";
@Injectable({
  providedIn: "root",
})
export class RideService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  uri = "http://localhost:4000/v1/ride";
  userDetails: Object;
  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public navCtrl: NavController,
    private router: Router
  ) {}
  AddRide(ride) {
    return this.http.post(`${this.uri}/add`, ride);
  }
  postUser(user: User) {
    return this.http.post(`${this.uri}/register`, user, this.noAuthHeader);
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem("jwtToken", token);
  }

  getToken() {
    return localStorage.getItem("jwtToken");
  }

  deleteToken() {
    localStorage.removeItem("jwtToken");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
