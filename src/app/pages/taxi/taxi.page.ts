import { interval } from "rxjs";
import { User } from "./../user";
import { Component, OnInit, SimpleChanges, NgZone } from "@angular/core";
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
import { AlertController } from "@ionic/angular";
import { ShowOnDirtyErrorStateMatcher } from "@angular/material";
var taxiicon = L.icon({
  iconUrl: "assets/img/taxi.png",
  shadowUrl: "assets/img/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
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
  selector: "app-taxi",
  templateUrl: "./taxi.page.html",
  styleUrls: ["./taxi.page.scss"],
})
export class TaxiPage implements OnInit {
  map: Map;
  tax: any = false;
  data: any;
  lat: any;
  lng: any;
  i: any;
  show: any = false;
  constructor(
    private user: UserService,
    private ride: RideService,
    public alertController: AlertController,
    private router: Router,
    public http: HttpClient,
    public _ngZone: NgZone,
    public toastCtrl: ToastController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {}
  ngOnInit() {
    this.geolocation
      .getCurrentPosition({
        maximumAge: 300000,
        timeout: 30000,
        enableHighAccuracy: true,
      })
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        console.log(this.lat);
        console.log(this.lng);
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
    setTimeout(() => {
      this.map = new Map("map").setView([this.lat, this.lng], 8);
      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "Map",
        maxZoom: 18,
      }).addTo(this.map);
      if (this.tax == false) {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5,
        };
        L.marker([this.lat, this.lng], { icon: blueicon }).addTo(this.map);
        this.user.taxi().subscribe(
          (res) => {
            this.data = res;
            console.log(this.data);
            for (let i = 0; i < this.data.length; i++) {
              var geojsonMarkerOptions = {
                icon: taxiicon,
                myCustomId: this.data[i]._id,
              };
              L.marker(
                [Number(this.data[i].lat), Number(this.data[i].lng)],
                geojsonMarkerOptions
              )
                .on("click", this.onMarkerClick)
                .addTo(this.map);
            }
          },
          (err) => {}
        );
      }
      if (this.tax == true) {
        L.marker([this.lat, this.lng], { icon: taxiicon }).addTo(this.map);
        var userdetails = this.user.getUserPayload()._id;
        console.log(userdetails);
        this.user.checkOffre(userdetails).subscribe(
          async (res) => {
            if (res.status === 401) {
            }
            if (this.show === false) {
              const alert = await this.alertController.create({
                cssClass: "buttonCss",
                header: "Quelqu'un demande une taxi ",
                message: "Voulez vous accepter cette demande",
                buttons: [
                  {
                    text: "Accepter",
                    cssClass: "secondary",
                    handler: (blah) => {
                      this.user.deleteOffre(userdetails).subscribe(
                        (res) => {},
                        (err) => {}
                      );
                    },
                  },
                  {
                    text: "Refuser",
                    handler: () => {
                      console.log("Confirm Okay");
                    },
                  },
                ],
              });
              await alert.present();
              this.show = true;
            }
          },
          async (err) => {}
        );
      }
    }, 1000);
  }
  reload(taxi) {
    this.tax = taxi;
    this.map.remove();
    this.map.off();
    this.ngOnInit();
  }
  onMarkerClick = function (e) {
    this.User.sendOffre(this.options.myCustomId).subscribe(
      (res) => {},
      (err) => {}
    );
    alert("You clicked on marker with customId: " + this.options.myCustomId);
  };
  interval1(userdetails) {
    this.http
      .post(`http://localhost:4000/v1/user/checkoffre`, { id: userdetails })
      .subscribe(
        (res) => {
          alert("bah ca marche");
        },
        (err) => {
          alert("bah ca marche pas");
        }
      );
    setTimeout(this.interval1, 5000);
  }
}
