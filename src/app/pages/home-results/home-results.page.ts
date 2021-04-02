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
  IonSearchbar,
} from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { UserService } from "../user.service";
import { interval } from "rxjs";
// Modals
import { SearchFilterPage } from "../../pages/modal/search-filter/search-filter.page";
import { ImagePage } from "./../modal/image/image.page";
// Call notifications test by Popover and Custom Component.
import { NotificationsComponent } from "./../../components/notifications/notifications.component";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { control } from "leaflet";
import { IonicSelectableComponent } from "ionic-selectable";

@Component({
  selector: "app-home-results",
  templateUrl: "./home-results.page.html",
  styleUrls: ["./home-results.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeResultsPage implements OnInit {
  vehicles = [
    { id: 1, name: "Chevy Truck", unitNumber: 123 },
    { id: 2, name: "Ford Truck", unitNumber: 456 },
    { id: 3, name: "Dodge Truck", unitNumber: 789 },
  ];

  selected_city = null;
  @ViewChild("searchbar") searchbar: IonSearchbar;
  selected = [];
  cities: City[];
  city: City;
  lat: any;
  lng: any;
  promotion: any;
  r: any;
  km: any = 60;
  show: boolean = true;
  bouton: any = "heart-empty";
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

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log("port:", event.value);
  }
  countriesInitial: any; //initialize your countriesInitial array empty
  countries: any; //initialize your countries array empty
  searchCountryString = "";
  constructor(
    public http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public popoverCtrl: PopoverController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private user: UserService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    http.get("https://restcountries.eu/rest/v2/all").subscribe((data) => {
      this.countriesInitial = data;
      this.countries = data;
    });
  }

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
  choixTrajet() {
    this.router.navigateByUrl("/map");
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
  test2(idp: any, idu: any) {
    this.http.get(`${this.user.uri}/getfav`).subscribe(
      (data) => {
        this.favoris = data;
        let found: boolean = false;
        for (let x of this.favoris) {
          if (x.id_prom === idp && x.id_user === idu) {
            found = true;
          }
        }
        if (found === true) {
          this.bouton = "heart-empty";
          let id: any;
          for (let x of this.favoris) {
            if (x.id_prom === idp && x.id_user === idu) {
              id = x._id;
            }
          }
          this.http.delete(`${this.user.uri}/delfav/` + `${id}`).subscribe(
            (res) => {},
            (err) => {
              this.err();
            }
          );
        } else {
          this.bouton = "heart";

          const obj = {
            proid: idp,
            userid: idu,
          };
          console.log(obj);
          this.http.post(`${this.user.uri}/addfav`, obj).subscribe(
            (res) => {
              if (res == "erreur") this.err();
              else this.ngOnInit();
            },
            (err) => {
              console.log("existe");
            }
          );
        }
        return true;
      },
      (err) => {
        if (err.status === 401) {
          console.log("erreur");
        }
      }
    );
    this.ngOnInit();
  }
  earchCountry(searchbar) {
    // reset countries list with initial call
    this.countries = this.countriesInitial;

    // set q to the value of the searchbar
    var q = searchbar.value;

    // if the value is an empty string don't filter the items
    if (q.trim() == "") {
      return;
    }

    this.countries = this.countries.filter((v) => {
      if (v.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
  }
  tou(idp: any, idu: any) {
    console.log("test");
    let found: boolean;
    this.http.get(`${this.user.uri}/getfav`).subscribe((data) => {
      this.favoris = data;
    });

    for (let y of this.favoris) {
      if (y.id_prom === idp && y.id_user === idu) {
        found = true;
        console.log(idp, idu);
      } else {
        found = false;
      }
    }
    console.log(found);
    if (found != true) {
      return "heart-empty";
    } else {
      return "heart";
    }
  }
  change() {
    if (this.km === 60) {
      this.km = 1000;
    } else {
      this.km = 60;
    }
  }
  seter() {
    if (this.error === false) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
}
class City {
  public id: String;
  public name: string;
}
