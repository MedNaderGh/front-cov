import { Component, OnInit } from "@angular/core";
import { Map, latLng, tileLayer, Layer, marker, icon } from "leaflet";
import * as L from "leaflet";
import { RideService } from "../ride.service";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { Router } from "@angular/router";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { UserService } from "../user.service";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { ToastController } from "@ionic/angular";
import { removeDebugNodeFromIndex } from "@angular/core/src/debug/debug_node";
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
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"],
})
export class MapPage implements OnInit {
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
  constructor(
    private user: UserService,
    private ride: RideService,
    private router: Router,
    public http: HttpClient,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {}

  ngOnInit() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat=resp.coords.latitude;
      this.lng=resp.coords.longitude;
      console.log(this.lat);
      console.log(this.lng);
 
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     




    setTimeout(() => {
      this.map = new Map("map").setView(
        [35.82585745561656, 10.363860849066295],
        7
      );
      this.map.invalidateSize();
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map",
        maxZoom: 8,
      }).addTo(this.map);
      this.map.on("click", <LeafletMouseEvent>(e) => {
        L.circle([this.lat, this.lng], { color:'red' ,
                                         fillColor:'red',
                                         opacity:0.6,
                                         radius:20000 })
      .addTo( this.map);
      });
    });
        
  }
 /*       
        this.i++;

        if (this.i == 1) {
          var coord = e.latlng.toString().split(",");
          this.lat = coord[0].split("(");
          this.lng = coord[1].split(")");
          this.lng = this.lng.toString().replace(",", "");
          this.lat = this.lat.toString().replace("LatLng,", "");
          this.pt1lat = Number(this.lat);
          this.pt1lng = Number(this.lng);
        }
        if (this.i == 2) {
          var coord = e.latlng.toString().split(",");
          this.lat = coord[0].split("(");
          this.lng = coord[1].split(")");
          this.lng = this.lng.toString().replace(",", "");
          this.lat = this.lat.toString().replace("LatLng,", "");
          this.pt2lat = Number(this.lat);
          this.pt2lng = Number(this.lng);
        }
        this.wayPoint1 = L.latLng(this.pt1lat, this.pt1lng);
        this.wayPoint2 = L.latLng(this.pt2lat, this.pt2lng);
        var bounds = L.latLngBounds(this.wayPoint1, this.wayPoint2);

        L.Routing.control({
          waypoints: [
            L.latLng(this.pt1lat, this.pt1lng),
            L.latLng(this.pt2lat, this.pt2lng),
          ],
          routeWhileDragging: true,
        }).addTo(this.map);
      });
      setTimeout(() => {
        let Ride = {
          cord_arrivee: this.wayPoint2.toString(),
          cord_depart: this.wayPoint1.toString(),
          id_user: localStorage.getItem("id"),
        };
        var RideString = JSON.stringify(Ride);
        var RideOld = localStorage.getItem("Ride");
        RideOld = RideOld.slice(0, -1);
        RideString = RideString.substring(1);
        RideOld = RideOld + "," + RideString;
        localStorage.setItem("Ride", RideOld);
        console.log(RideOld);
        this.ride.AddRide(JSON.parse(RideOld)).subscribe(
          (res) => {
            this.SuccessToast();
            this.router.navigateByUrl("/home-results");
          },
          (err) => {
            console.log(err.error.message);
          }
        );
      }, 5000);
    }, 100);
  }
  async SuccessToast() {
    const toast = await this.toastCtrl.create({
      message: "Le Trajet a était ajouté avec success",
      duration: 2000,
    });
    toast.present();
  }

*/
      


}
