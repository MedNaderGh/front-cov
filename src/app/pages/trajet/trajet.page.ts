import { PositionSRService } from './../../position-sr.service';
import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IonicSelectableComponent } from "ionic-selectable";
import {
  NavController,
  MenuController,
  ToastController,
  AlertController,
  LoadingController,
} from "@ionic/angular";
import { UserService } from "../user.service";
import { Router } from "@angular/router";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";



import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";


class City {
  public name: string;
}
@Component({
  selector: "app-trajet",
  templateUrl: "./trajet.page.html",
  styleUrls: ["./trajet.page.scss"],
})
export class TrajetPage implements OnInit {
  contactForm: FormGroup;
  userDetails: any;
  cities: City[];
  city: City;
  lat: any;
  lng: any;
  recommandation :any[];

  constructor(
    private http: HttpClient,
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    private user: UserService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private router: Router,
    private PositionSRService:PositionSRService
  ) {
    this.cities = [
      {
        name: "Tunis",
      },
      {
        name: "Le Bardo",
      },
      {
        name: "Le Kram",
      },
      {
        name: "La Goulette",
      },
      {
        name: "Carthage (commune)",
      },
      {
        name: "Sidi Bou Said",
      },
      {
        name: "La Marsa",
      },
      {
        name: "Sidi Hassine",
      },
      {
        name: "Gouvernorat d'Ariana",
      },
      {
        name: "Ariana, Tunisie",
      },
      {
        name: "La Soukra",
      },
      {
        name: "Raoued",
      },
      {
        name: "Kalâat el-Andalous",
      },
      {
        name: "Sidi Thabet",
      },
      {
        name: "Ettadhamen-Mnihla",
      },
      {
        name: "Gouvernorat de Ben Arous",
      },
      {
        name: "Ben Arous",
      },
      {
        name: "El Mourouj",
      },
      {
        name: "Hammam Lif",
      },
      {
        name: "Hammam Chott",
      },
      {
        name: "Bou Mhel el-Bassatine",
      },
      {
        name: "Ezzahra",
      },
      {
        name: "Radès",
      },
      {
        name: "Mégrine",
      },
      {
        name: "Mohamedia-Fouchana",
      },
      {
        name: "Mornag",
      },
      {
        name: "Khalidia",
      },
      {
        name: "Gouvernorat de la Manouba",
      },
      {
        name: "Manouba",
      },
      {
        name: "Den Den",
      },
      {
        name: "Douar Hicher",
      },
      {
        name: "Oued Ellil",
      },
      {
        name: "Mornaguia",
      },
      {
        name: "Borj El Amri",
      },
      {
        name: "Djedeida",
      },
      {
        name: "Tebourba",
      },
      {
        name: "El Battan",
      },
      {
        name: "Gouvernorat de Nabeul",
      },
      {
        name: "Nabeul",
      },
      {
        name: "Dar Chaabane",
      },
      {
        name: "Béni Khiar",
      },
      {
        name: "El Maâmoura",
      },
      {
        name: "Somâa",
      },
      {
        name: "Korba, Tunisie",
      },
      {
        name: "Tazerka",
      },
      {
        name: "Menzel Temime",
      },
      {
        name: "Menzel Horr",
      },
      {
        name: "El Mida",
      },
      {
        name: "Kelibia",
      },
      {
        name: "Azmour",
      },
      {
        name: "Hammam Ghezèze",
      },
      {
        name: "Dar Allouch",
      },
      {
        name: "El Haouaria",
      },
      {
        name: "Takelsa",
      },
      {
        name: "Soliman, Tunisie",
      },
      {
        name: "Korbous",
      },
      {
        name: "Menzel Bouzelfa",
      },
      {
        name: "Béni Khalled",
      },
      {
        name: "Zaouiet Djedidi",
      },
      {
        name: "Grombalia",
      },
      {
        name: "Bou Argoub",
      },
      {
        name: "Hammamet, Tunisie",
      },
      {
        name: "Gouvernorat de Zaghouan",
      },
      {
        name: "Zaghouan",
      },
      {
        name: "Zriba",
      },
      {
        name: "Bir Mcherga",
      },
      {
        name: "Djebel Oust",
      },
      {
        name: "El Fahs",
      },
      {
        name: "Nadhour",
      },
      {
        name: "Gouvernorat de Bizerte",
      },
      {
        name: "Bizerte",
      },
      {
        name: "Sejnane",
      },
      {
        name: "Mateur",
      },
      {
        name: "Menzel Bourguiba",
      },
      {
        name: "Tinja, Tunisie",
      },
      {
        name: "Ghar al Milh",
      },
      {
        name: "Aousja",
      },
      {
        name: "Menzel Jemil",
      },
      {
        name: "Menzel Abderrahmane",
      },
      {
        name: "El Alia",
      },
      {
        name: "Ras Jebel",
      },
      {
        name: "Metline",
      },
      {
        name: "Raf Raf",
      },
      {
        name: "Gouvernorat de Béja",
      },
      {
        name: "Béja",
      },
      {
        name: "El Maâgoula",
      },
      {
        name: "Zahret Medien",
      },
      {
        name: "Nefza",
      },
      {
        name: "Téboursouk",
      },
      {
        name: "Testour",
      },
      {
        name: "Goubellat",
      },
      {
        name: "Majaz al Bab",
      },
      {
        name: "Gouvernorat de Jendouba",
      },
      {
        name: "Jendouba",
      },
      {
        name: "Bou Salem",
      },
      {
        name: "Tabarka",
      },
      {
        name: "Aïn Draham",
      },
      {
        name: "Fernana",
      },
      {
        name: "Beni M'Tir",
      },
      {
        name: "Ghardimaou",
      },
      {
        name: "Oued Melliz",
      },
      {
        name: "Gouvernorat du Kef",
      },
      {
        name: "El Kef",
      },
      {
        name: "Nebeur",
      },
      {
        name: "Touiref",
      },
      {
        name: "Sakiet Sidi Youssef",
      },
      {
        name: "Tajerouine",
      },
      {
        name: "Menzel Salem",
      },
      {
        name: "Kalaat es Senam",
      },
      {
        name: "Kalâat Khasba",
      },
      {
        name: "Jérissa",
      },
      {
        name: "El Ksour",
      },
      {
        name: "Dahmani",
      },
      {
        name: "Sers, Tunisie",
      },
      {
        name: "Gouvernorat de Siliana",
      },
      {
        name: "Siliana",
      },
      {
        name: "Bou Arada",
      },
      {
        name: "Gaâfour",
      },
      {
        name: "El Krib",
      },
      {
        name: "Sidi Bou Rouis",
      },
      {
        name: "Maktar",
      },
      {
        name: "Rouhia",
      },
      {
        name: "Kesra",
      },
      {
        name: "Bargou",
      },
      {
        name: "El Aroussa",
      },
      {
        name: "Gouvernorat de Sousse",
      },
      {
        name: "Sousse",
      },
      {
        name: "Ksibet Thrayet",
      },
      {
        name: "Ezzouhour",
      },
      {
        name: "Zaouiet Sousse",
      },
      {
        name: "Hammam Sousse",
      },
      {
        name: "Akouda",
      },
      {
        name: "Kalâa Kebira",
      },
      {
        name: "Sidi Bou Ali",
      },
      {
        name: "Hergla",
      },
      {
        name: "Enfidha",
      },
      {
        name: "Bouficha",
      },
      {
        name: "Sidi El Hani",
      },
      {
        name: "M'saken",
      },
      {
        name: "Kalâa Seghira",
      },
      {
        name: "Messaadine",
      },
      {
        name: "Kondar, Tunisie",
      },
      {
        name: "Gouvernorat de Monastir",
      },
      {
        name: "Monastir, Tunisie",
      },
      {
        name: "Khniss",
      },
      {
        name: "Ouerdanin",
      },
      {
        name: "Sahline Moôtmar",
      },
      {
        name: "Sidi Ameur, Tunisie",
      },
      {
        name: "Zéramdine",
      },
      {
        name: "Beni Hassen",
      },
      {
        name: "Ghenada",
      },
      {
        name: "Jemmal",
      },
      {
        name: "Menzel Kamel",
      },
      {
        name: "Zaouiet Kontoch",
      },
      {
        name: "Bembla-Mnara",
      },
      {
        name: "Menzel Ennour",
      },
      {
        name: "El Masdour",
      },
      {
        name: "Moknine",
      },
      {
        name: "Sidi Bennour, Tunisie",
      },
      {
        name: "Menzel Farsi",
      },
      {
        name: "Amiret El Fhoul",
      },
      {
        name: "Amiret Touazra",
      },
      {
        name: "Amiret El Hojjaj",
      },
      {
        name: "Cherahil",
      },
      {
        name: "Bekalta",
      },
      {
        name: "Téboulba",
      },
      {
        name: "Ksar Hellal",
      },
      {
        name: "Ksibet El Mediouni",
      },
      {
        name: "Benen Bodher",
      },
      {
        name: "Touza",
      },
      {
        name: "Sayada, Tunisie",
      },
      {
        name: "Lemta",
      },
      {
        name: "Bouhjar",
      },
      {
        name: "Menzel Hayet",
      },
      {
        name: "Gouvernorat de Mahdia",
      },
      {
        name: "Mahdia, Tunisie",
      },
      {
        name: "Rejiche",
      },
      {
        name: "Bou Merdes",
      },
      {
        name: "Ouled Chamekh",
      },
      {
        name: "Chorbane",
      },
      {
        name: "Hebira",
      },
      {
        name: "Essouassi",
      },
      {
        name: "El Djem",
      },
      {
        name: "Kerker",
      },
      {
        name: "Chebba",
      },
      {
        name: "Melloulèche",
      },
      {
        name: "Sidi Alouane",
      },
      {
        name: "Ksour Essef",
      },
      {
        name: "El Bradâa",
      },
      {
        name: "Gouvernorat de Sfax",
      },
      {
        name: "Sfax",
      },
      {
        name: "Sakiet Ezzit",
      },
      {
        name: "Chihia",
      },
      {
        name: "Sakiet Eddaïer",
      },
      {
        name: "Gremda",
      },
      {
        name: "El Ain, Tunisie",
      },
      {
        name: "Thyna",
      },
      {
        name: "Agareb",
      },
      {
        name: "Jebiniana",
      },
      {
        name: "El Hencha",
      },
      {
        name: "Menzel Chaker",
      },
      {
        name: "Ghraïba, Tunisie",
      },
      {
        name: "Bir Ali Ben Khélifa",
      },
      {
        name: "Skhira",
      },
      {
        name: "Mahares",
      },
      {
        name: "Kerkennah",
      },
      {
        name: "Gouvernorat de Kairouan",
      },
      {
        name: "Kairouan",
      },
      {
        name: "Chebika, Kairouan",
      },
      {
        name: "Sbikha",
      },
      {
        name: "Oueslatia",
      },
      {
        name: "Aïn Djeloula",
      },
      {
        name: "Haffouz",
      },
      {
        name: "Alaâ",
      },
      {
        name: "Hajeb El Ayoun",
      },
      {
        name: "Nasrallah, Tunisie",
      },
      {
        name: "Menzel Mehiri",
      },
      {
        name: "Echrarda",
      },
      {
        name: "Bou Hajla",
      },
      {
        name: "Gouvernorat de Kasserine",
      },
      {
        name: "Kasserine",
      },
      {
        name: "Sbeitla",
      },
      {
        name: "Sbiba",
      },
      {
        name: "Jedelienne",
      },
      {
        name: "Thala, Tunisie",
      },
      {
        name: "Haïdra",
      },
      {
        name: "Foussana",
      },
      {
        name: "Fériana",
      },
      {
        name: "Thélepte",
      },
      {
        name: "Magel Bel Abbès",
      },
      {
        name: "Gouvernorat de Sidi Bouzid",
      },
      {
        name: "Sidi Bouzid",
      },
      {
        name: "Jilma",
      },
      {
        name: "Cebalet",
      },
      {
        name: "Bir El Hafey",
      },
      {
        name: "Sidi Ali Ben Aoun",
      },
      {
        name: "Menzel Bouzaiane",
      },
      {
        name: "Meknassy",
      },
      {
        name: "Mezzouna",
      },
      {
        name: "Regueb",
      },
      {
        name: "Ouled Haffouz",
      },
      {
        name: "Gouvernorat de Gabès",
      },
      {
        name: "Gabès",
      },
      {
        name: "Chenini Nahal",
      },
      {
        name: "Ghannouch",
      },
      {
        name: "Métouia",
      },
      {
        name: "Oudhref",
      },
      {
        name: "El Hamma",
      },
      {
        name: "Matmata, Tunisie",
      },
      {
        name: "Nouvelle Matmata",
      },
      {
        name: "Mareth",
      },
      {
        name: "Zarat, Tunisie",
      },
      {
        name: "Gouvernorat de Mednine",
      },
      {
        name: "Médenine",
      },
      {
        name: "Beni Khedache",
      },
      {
        name: "Ben Gardane",
      },
      {
        name: "Zarzis",
      },
      {
        name: "Houmt El Souk",
      },
      {
        name: "Midoun",
      },
      {
        name: "Ajim",
      },
      {
        name: "Gouvernorat de Tataouine",
      },
      {
        name: "Tataouine",
      },
      {
        name: "Bir Lahmar",
      },
      {
        name: "Ghomrassen",
      },
      {
        name: "Dehiba",
      },
      {
        name: "Remada",
      },
      {
        name: "Gouvernorat de Gafsa",
      },
      {
        name: "Gafsa",
      },
      {
        name: "El Ksar",
      },
    ];

    this.recommandation=[
      {
        name:"sahbi",
        lastname:"bannour"
      },
      {
        name:"abir",
        lastname:"bouajila"
      },
      {
        name:"amira",
        lastname:"issatso"
      },
      {
        name:"nader",
        lastname:"sud tunisie"
      }
    ]

  }

  ngOnInit() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.lng=resp.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
      this.PositionSRService.SendPosition(this.lat,this.lng);
      this.PositionSRService.ListRecommandation();

 
     }).catch((error) => {
       console.log('Error getting location', error);
     });


    this.contactForm = this.formBuilder.group({
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
      sujet: ["", [Validators.maxLength(70), Validators.required]],
      msg: ["", [Validators.maxLength(70), Validators.required]],
      name: [""],
      id: [""],
    });
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: localStorage.getItem("jwtToken"),
      }),
    };
    this.http.get(`${this.user.uri}/userProfile`, httpOptions).subscribe(
      (data) => {
        this.userDetails = data;
        this.contactForm.get("id").setValue(this.userDetails._id);
        this.contactForm.get("name").setValue(this.userDetails.fullName);
        console.log(this.userDetails._id, this.userDetails.fullName);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  portChange(event: { component: IonicSelectableComponent; value: any }) {
    console.log("port:", event.value);
  }
  goToMap(Ville_depart, Ville_arrivee) {
    
    this.router.navigateByUrl("/map");
  }
  envoyer(form: FormGroup) {
    this.http.post(`${this.user.uri}/message`, form.value).subscribe(
      (res) => {
        this.presentToast();
        this.contactForm.reset();
      },
      (err) => {
        this.erreurToast();
      }
    );
  }
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message:
        "Message envoyer avec succees vous allez recevoir un reponse via email dans la prochaine 48H",
      duration: 6000,
      showCloseButton: true,
      closeButtonText: "X",
    });
    toast.present();
  }
  async erreurToast() {
    const toast = await this.toastCtrl.create({
      message: "Operation echouee",
      duration: 2000,
      showCloseButton: true,
      closeButtonText: "X",
    });
    toast.present();
  }

  view(){
    this.router.navigateByUrl("/view-drive");
  }
}
