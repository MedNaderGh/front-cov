import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
} from "@angular/material";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { ImagePageModule } from "./pages/modal/image/image.module";
import { SearchFilterPageModule } from "./pages/modal/search-filter/search-filter.module";
import { UserService } from "./pages/user.service";
import { NotificationsComponent } from "./components/notifications/notifications.component";
import { AgmCoreModule } from "@agm/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { IonicRatingModule } from "ionic4-rating";
import { BarRatingModule } from "ngx-bar-rating";
import { IonicSelectableModule } from "ionic-selectable";
import { NgCircleProgressModule } from "ng-circle-progress";
@NgModule({
  declarations: [AppComponent, NotificationsComponent],
  imports: [
    IonicRatingModule,
    BarRatingModule,
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
    IonicSelectableModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDCa1LUe1vOczX1hO_iGYgyo8p_jYuGOPU",
    }),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    ImagePageModule,
    SearchFilterPageModule,
    DragDropModule,
    ScrollingModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  entryComponents: [NotificationsComponent],
  providers: [
    IonicRatingModule,
    StatusBar,
    UserService,
    InAppBrowser,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
