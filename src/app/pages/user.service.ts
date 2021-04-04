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
export class UserService {
  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };
  uri = "http://localhost:4000/v1/user";
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
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Inscription reussi",
      duration: 2000,
    });
    toast.present();
  }
  async erreurToast() {
    const toast = await this.toastController.create({
      message: "email deja existe",
      duration: 2000,
    });
    toast.present();
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

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
/* login(email: String, password: String){
    const obj = {
      email: email,
      password: password
    };
  this.http.post(`${this.uri}/login`,obj)
  .subscribe(
    res=>{this.router.navigate(['/home-results'])
    this.logsToast()} ,
    errorResp=>this.logeToast()
  )
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Inscription reussi',
      duration: 2000
    });
    toast.present();
  }
  async erreurToast() {
    const toast = await this.toastController.create({
      message: 'email deja existe',
      duration: 2000
    });
    toast.present();
  }
  async logsToast() {
    const toast = await this.toastController.create({
      message: 'login avec succes',
      duration: 2000
    });
    toast.present();
  }
  async logeToast() {
    const toast = await this.toastController.create({
      message: 'login ou mot de passe est incorrecte',
      duration: 2000
    });
    toast.present();
  }
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
  goToInscription() {
    this.navCtrl.navigateRoot('/registry');
  }
}*/
