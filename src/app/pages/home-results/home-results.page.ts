import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
} from "@angular/core";
import {
  NavController,
  AlertController,
  MenuController,
  ToastController,
  PopoverController,
  ModalController,
} from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";
import { interval } from "rxjs";
// Modals
import { SearchFilterPage } from "../../pages/modal/search-filter/search-filter.page";
import { ImagePage } from "./../modal/image/image.page";
// Call notifications test by Popover and Custom Component.
import { Router } from "@angular/router";

@Component({
  selector: "app-home-results",
  templateUrl: "./home-results.page.html",
  styleUrls: ["./home-results.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeResultsPage implements OnInit {
  lat: any;
  lng: any;
  promotion: any;
  r: any;
  km: any = 60;
  show: boolean = true;
  country: string;
  error: boolean = false;
  userDetails: Object;
  public searchKey: string = " ";
  fav: any;
  favoris: any;
  async logsToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
    });
    toast.present();
  }
  books: any;
  ngOnInit() {}

  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private user: UserService,
    private router: Router
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true);
  }

  settings() {
    this.navCtrl.navigateForward("settings");
  }

  async searchFilter() {
    const modal = await this.modalCtrl.create({
      component: SearchFilterPage,
    });
    return await modal.present();
  }

  async presentImage(image: any) {
    const modal = await this.modalCtrl.create({
      component: ImagePage,
      componentProps: { value: image },
    });
    return await modal.present();
  }
  onOrder(book: any) {
    alert("waaaa");
  }
  choixTrajet(smoking, music, bag, myDate, place, prix) {
    if (smoking === undefined) smoking = false;
    if (music === undefined) music = false;
    if (bag === undefined) bag = false;
    myDate = myDate.toString();
    myDate = myDate.slice(0, -13);
    myDate = myDate.replace("T", " ");
    var Ride = {
      smoking: smoking,
      music: music,
      bag: bag,
      myDate: myDate,
      place: place,
      prix: prix,
    };
    localStorage.setItem("Ride", JSON.stringify(Ride));
    this.router.navigateByUrl("/trajet");
  }
  del(proid: any, userid: any) {
    const obj = {
      proid: proid,
      userid: userid,
    };
    console.log("test");
    this.http.post(`${this.user.uri}/isfav`, obj).subscribe(
      (res) => {
        this.fav = res;
      },
      (errorResp) => {
        console.log("false");
      }
    );
    this.http.delete(`${this.user.uri}/delfav` + `${this.fav._id}`).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.log("false");
      }
    );
  }
  async err() {
    const toast = await this.toastCtrl.create({
      message: "Cette promotion est deja dans la liste favoris ",
      duration: 2000,
    });
    toast.present();
  }
  async suc() {
    const toast = await this.toastCtrl.create({
      message: "Promotion ajoutée au favoris ❤️",
      duration: 2000,
    });
    toast.present();
  }
  search(msg: any) {
    this.show = false;
  }
}
