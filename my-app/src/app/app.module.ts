import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PendingComponent } from './users/pending/pending.component';
import { AdminComponent } from './admin/admin.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';
import { AuctionListComponent } from './auctions/auction-list/auction-list.component';
import { AuctionDetailComponent } from './auctions/auction-detail/auction-detail.component';
import { LoginComponent } from './users/login/login.component';
import { FormsModule } from '@angular/forms'; 
import { UserDataService } from './services/user-data.service';
import { ErrorInterceptor} from './helpers/error.interceptor';
import { JwtInterceptor} from './helpers/jwt.interceptor';
import { SearchAuctionsComponent } from './auctions/search-auctions/search-auctions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { AuctionCreateComponent } from './auctions/auction-create/auction-create.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyauctionsComponent } from './auctions/myauctions/myauctions.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { AuthGuard } from './guards/auth.guard';
import { AdminguardService } from './guards/adminguard.service';
import { WonAuctionsComponent } from './auctions/won-auctions/won-auctions.component';
import { AuctionExportComponent } from './auctions/auction-export/auction-export.component';
import { AuctionEditDeleteComponent } from './auctions/auction-edit-delete/auction-edit-delete.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { MapDetailComponent } from './map-detail/map-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PendingComponent,
    AdminComponent,
    UserDetailComponent,
    AuctionListComponent,
    AuctionDetailComponent,
    LoginComponent,
    SearchAuctionsComponent,
    MessagesComponent,
    AuctionCreateComponent,
    RegistrationComponent,
    NavbarComponent,
    MyauctionsComponent,
    JwPaginationComponent,
    WonAuctionsComponent,
    AuctionEditDeleteComponent,
    AuctionExportComponent,
    RecommendationComponent,
    MapDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'list', component: UserListComponent, canActivate: [AuthGuard,AdminguardService] },
      { path: 'auctions', component: AuctionListComponent },
      { path: 'myauctions', component: MyauctionsComponent, canActivate: [AuthGuard] },
      { path: 'act', component: PendingComponent, canActivate: [AuthGuard] },
      { path: 'detail/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
      { path: 'auction/:id', component: AuctionDetailComponent },
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard,AdminguardService] },
      { path: 'login', component: LoginComponent },
      { path: 'messages/:act', component: MessagesComponent, canActivate: [AuthGuard]},
      { path: 'create', component: AuctionCreateComponent, canActivate: [AuthGuard] },
      { path: 'edit/:id', component: AuctionEditDeleteComponent, canActivate: [AuthGuard] },
      { path: 'export/:id', component: AuctionExportComponent },
      { path: 'register', component: RegistrationComponent },
      { path: "filters", component: SearchAuctionsComponent },
      { path: "won", component: WonAuctionsComponent },
      { path: "export", component: AuctionExportComponent, canActivate: [AdminguardService] },
      { path: "reco", component: RecommendationComponent },
      { path: "map", component: MapDetailComponent }
    ])
  ],
  providers: [
    AdminguardService,
    AuthGuard,
    UserDataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
