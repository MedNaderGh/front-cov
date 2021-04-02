import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "register",
    loadChildren: "./pages/register/register.module#RegisterPageModule",
  },
  { path: "about", loadChildren: "./pages/about/about.module#AboutPageModule" },
  {
    path: "home-results",
    loadChildren:
      "./pages/home-results/home-results.module#HomeResultsPageModule",
  },
  { path: "map", loadChildren: "./pages/map/map.module#MapPageModule" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
