import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { RidePage } from './ride.page';
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";

const routes: Routes = [
  {
    path: '',
    component: RidePage
  }
];

@NgModule({
  providers: [Geolocation, NativeGeocoder],
  imports: [
    LeafletModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RidePage]
})
export class RidePageModule {}
