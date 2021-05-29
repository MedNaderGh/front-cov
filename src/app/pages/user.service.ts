import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastController } from "@ionic/angular";
import {
  NavController,
  MenuController,
  LoadingController,
} from "@ionic/angular";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user";
@Injectable({
  providedIn: "root",
})
export class UserService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  uri = "http://192.168.1.3:4000/v1/user";
  userDetails: Object;
  constructor(
    private http: HttpClient,
    public toastController: ToastController,
    public navCtrl: NavController,
    private router: Router
  ) {}
  goToLogin() {
    this.navCtrl.navigateRoot("/");
  }
  login(authCredentials) {
    return this.http.post(`${this.uri}/authenticate`, authCredentials);
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
  taxi() {
    return this.http.get(`${this.uri}/taxi`, this.noAuthHeader);
  }
  sendOffre(id) {
    return this.http.post(`${this.uri}/offre`, { id }, this.noAuthHeader);
  }
  deleteOffre(id) {
    return this.http.post(`${this.uri}/deleteoffre`, { id }, this.noAuthHeader);
  }
  checkOffre(id): Observable<any> {
    return this.http.post(
      `${this.uri}/checkoffre`,
      { id: id },
      this.noAuthHeader
    );
  }
  getcomment(id) {
    return this.http.get(`${this.uri}/getcomment/` + `${id}`);
  }
  commenter(comment) {
    return this.http.post(`${this.uri}/comment/`, comment);
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
