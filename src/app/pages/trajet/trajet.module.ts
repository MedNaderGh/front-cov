import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TrajetPage } from "./trajet.page";
import { IonicSelectableModule } from "ionic-selectable";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
const routes: Routes = [
  {
    path: "",
    component: TrajetPage,
  },
];

@NgModule({
  providers: [Geolocation, NativeGeocoder],
  imports: [
    ReactiveFormsModule,
    IonicSelectableModule,
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [TrajetPage],
})
export class TrajetPageModule {}
