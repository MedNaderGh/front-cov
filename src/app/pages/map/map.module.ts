import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { IonicModule } from "@ionic/angular";
import { MapPage } from "./map.page";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { NgCircleProgressModule } from "ng-circle-progress";
const routes: Routes = [
  {
    path: "",
    component: MapPage,
  },
];

@NgModule({
  providers: [Geolocation, NativeGeocoder],
  imports: [
    CommonModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      backgroundStrokeWidth: 0,
      backgroundPadding: 7,
      space: -3,
      toFixed: 0,
      outerStrokeWidth: 4,
      outerStrokeColor: "#4d94ff",
      innerStrokeWidth: 2,
      innerStrokeColor: "#e7e8ea",
      animationDuration: 200,
      animation: true,
      startFromZero: false,
      responsive: false,
      showUnits: true,
      showTitle: true,
      showSubtitle: true,
      showImage: false,
      renderOnClick: false,
    }),
    LeafletModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [MapPage],
})
export class MapPageModule {}
