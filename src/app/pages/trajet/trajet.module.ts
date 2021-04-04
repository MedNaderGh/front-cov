import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { TrajetPage } from "./trajet.page";
import { IonicSelectableModule } from "ionic-selectable";
const routes: Routes = [
  {
    path: "",
    component: TrajetPage,
  },
];

@NgModule({
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
