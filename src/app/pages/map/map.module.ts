import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder} from '@ionic-native/native-geocoder/ngx';
import { IonicModule } from '@ionic/angular';
import { MapPage } from './map.page';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
const routes: Routes = [
  {
    path: '',
    component: MapPage
  }
];

@NgModule({
  providers: [
    Geolocation,
    NativeGeocoder
  ],
  imports: [
    CommonModule,
    FormsModule,
    LeafletModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MapPage]
})
export class MapPageModule {}
