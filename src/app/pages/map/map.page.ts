import { Component, OnInit } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker ,icon} from 'leaflet';
import * as L from 'leaflet';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import { HttpHeaders ,HttpClient } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { UserService } from '../user.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
/*const iconRetinaUrl = 'leaflet/dist/images/marker-icon-2x.png';
const iconUrl = 'leaflet/dist/images/marker-icon.png';
const shadowUrl = 'leaflet/dist/images/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
//L.marker.prototype.options.icon = iconDefault;*/

// Assign the imported image assets before you do anything with Leaflet.
var blueicon = L.icon({
  iconRetinaUrl: 'assets/img/marker-icon-2x.png',
  iconUrl: 'assets/img/marker-icon.png',
  shadowUrl: 'assets/img/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  
  map: Map;
  promotion: any;
  lat:any;
  lng:any;
  i:number=0;
  pt1lat:any;
  pt1lng:any;
  pt2lat:any;
  pt2lng:any;
  constructor(    private user: UserService,
    public http: HttpClient,private geolocation: Geolocation,private nativeGeocoder: NativeGeocoder) { }

  ngOnInit() {
    setTimeout(() => {
    this.map = new Map('map').setView([34.009508, 9.4289231], 13);
      this.map.invalidateSize();
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map',
        maxZoom: 18
      }).addTo(this.map);
      this.map.on('click', <LeafletMouseEvent>(e) =>{
        console.log(e.latlng.toString());
        L.marker([e.latlng.lat, e.latlng.lng],{icon:blueicon}).addTo(this.map);
        this.i++;
        
        if(this.i==1){
          var coord = e.latlng.toString().split(',');
          this.lat = coord[0].split('(');
          this.lng= coord[1].split(')');
          this.lng=this.lng.toString().replace(',','');
          this.lat=this.lat.toString().replace('LatLng,','');
          this.pt1lat=Number(this.lat);
          this.pt1lng=Number(this.lng);
        }
        if (this.i==2){
          var coord = e.latlng.toString().split(',');
          this.lat = coord[0].split('(');
          this.lng= coord[1].split(')');
          this.lng=this.lng.toString().replace(',','');
          this.lat=this.lat.toString().replace('LatLng,','');
          this.pt2lat=Number(this.lat);
          this.pt2lng=Number(this.lng)
        }
      var wayPoint1 = L.latLng(this.pt1lat, this.pt1lng);
      var wayPoint2 = L.latLng(this.pt2lat, this.pt2lng);
      var bounds = L.latLngBounds(wayPoint1, wayPoint2); 
      
      L.Routing.control({
        waypoints: [L.latLng(this.pt1lat, this.pt1lng), L.latLng(this.pt2lat, this.pt2lng)],
        routeWhileDragging: true,
      }).addTo(this.map);
      })
    }, 100);
  }
}

