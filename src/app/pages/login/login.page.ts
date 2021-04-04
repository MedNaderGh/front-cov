import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  NavController,
  MenuController,
  ToastController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { HttpHeaders, HttpClient, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  [x: string]: any;
  data: any;
  public onLoginForm: FormGroup;

  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private user: UserService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }
  serverErrorMessages: string;
  ngOnInit() {
    this.onLoginForm = this.formBuilder.group({
      email: [
        "",
        [
          Validators.maxLength(70),
          Validators.pattern(
            "^[_A-Za-z0-9-+]+(.[_A-Za-z0-9-]+)@[A-Za-z0-9-]+(.[A-Za-z0-9]+)(.[A-Za-z]{2,})$"
          ),
          Validators.required,
        ],
      ],
      password: [null, Validators.compose([Validators.required])],
    });
  }

  async forgotPass() {
    const alert = await this.alertCtrl.create({
      header: "mot de pass oublié?",
      message: "Entrer ton e-mail pour resevoir un e-mail de restauration",
      inputs: [
        {
          name: "email",
          type: "email",
          placeholder: "Email",
        },
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm annulation");
          },
        },
        {
          text: "Confirmer",
          handler: async () => {
            const loader = await this.loadingCtrl.create({
              duration: 2000,
            });

            loader.present();
            loader.onWillDismiss().then(async (l) => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                message: "Email envoyé.",
                duration: 3000,
                position: "bottom",
              });

              toast.present();
            });
          },
        },
      ],
    });

    await alert.present();
  }
  login(form: FormGroup) {
    this.user.login(form.value).subscribe(
      (res) => {
        this.data = res;
        console.log(this.data);

        //localStorage.setItem("id", this.data._id);
        this.user.setToken(res["token"]);
        this.data = this.user.getUserPayload();
        localStorage.setItem("id", this.data._id);
        this.router.navigateByUrl("/home-results");
        this.logsToast();
      },
      (err) => {
        this.serverErrorMessages = err.error.message;
        this.logeToast();
      }
    );
  }

  async logsToast() {
    const toast = await this.toastCtrl.create({
      message: "login avec succes",
      duration: 2000,
    });
    toast.present();
  }
  async logeToast() {
    const toast = await this.toastCtrl.create({
      message: "login ou mot de passe est incorrecte ou compte non activé",
      duration: 2000,
    });
    toast.present();
  }
  goToRegister() {
    this.navCtrl.navigateRoot("/register");
  }

  goToHome() {
    this.navCtrl.navigateRoot("/home-results");
  }
}
