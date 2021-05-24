import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "register",
    loadChildren: "./pages/register/register.module#RegisterPageModule",
  },
  {
    path: "trajet",
    loadChildren: "./pages/trajet/trajet.module#TrajetPageModule",
  },
  {
    path: "home-results",
    loadChildren:
      "./pages/home-results/home-results.module#HomeResultsPageModule",
  },
  { path: "map", loadChildren: "./pages/map/map.module#MapPageModule" },
  { path: "taxi", loadChildren: "./pages/taxi/taxi.module#TaxiPageModule" },
  {
    path: "profil",
    loadChildren: "./pages/profil/profil.module#ProfilPageModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
