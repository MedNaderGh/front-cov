import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { ProfilPage } from "./profil.page";
import { DhmStarRatingModule } from "dhm-star-rating";
const routes: Routes = [
  {
    path: "",
    component: ProfilPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DhmStarRatingModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ProfilPage],
})
export class ProfilPageModule {}
