import { PassengerService } from './../passenger.service';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { Map, latLng, tileLayer, Layer, marker, icon } from "leaflet";
import * as L from "leaflet";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { ToastController } from "@ionic/angular";
import { AlertController } from "@ionic/angular";


var blueicon = L.icon({
  iconRetinaUrl: "assets/img/marker-icon-2x.png",
  iconUrl: "assets/img/marker-icon.png",
  shadowUrl: "assets/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

@Component({
  selector: 'app-ride',
  templateUrl: './ride.page.html',
  styleUrls: ['./ride.page.scss'],
})
export class RidePage implements OnInit {
  map: Map;
  promotion: any;
  lat: any;
  lng: any;
  i: number = 0;
  pt1lat: any;
  pt1lng: any;
  pt2lat: any;
  pt2lng: any;
  wayPoint1: any;
  wayPoint2: any;
  data :any;
  varlat:any;
  varlong:any;
  constructor(
    public Passengers:PassengerService,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private alertCtrl:AlertController
  ) {}

 

  ngOnInit() {
    setTimeout(() => {
      this.map = new Map("map").setView(
        [35.82585745561656, 10.363860849066295],
        7
      );
      this.map.invalidateSize();
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map",
        maxZoom: 18,
      }).addTo(this.map);

     // this.map.on("click", <LeafletMouseEvent>(e) => {
       // L.marker([e.latlng.lat, e.latlng.lng], { icon: blueicon }).addTo(
       //   this.map)
   //   });
       
      this.Passengers.findAll().subscribe(
        (res) => {
          this.data = res;
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
             this.varlat=Number(this.data[i].cord_depart.substring(7,14));
             this.varlong=Number(this.data[i].cord_depart.substring(17, 25));
             L.marker([this.varlat, this.varlong], { icon: blueicon }).bindPopup("<b>ville d'arrivee :</b>"+this.data[i].lieu_arr+
                                  "<br><b>nombre de places :</b>"+this.data[i].nb_places+
                                  "<br><b>prix :</b>"+this.data[i].prix+"DT" ).openPopup().on("click", this.onMarkerClick).addTo(
                                    this.map);
             }  
       
        },
        (err) => {}
      );
        
       
      
    });
   

  }
  onMarkerClick = function (e) {

    if (confirm("you want to reserve it !")) {
     console.log("yes");
   
    }
    }
  

 

}
