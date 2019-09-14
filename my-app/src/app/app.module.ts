import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PendingComponent } from './pending/pending.component';
import { AdminComponent } from './admin/admin.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuctionListComponent } from './auction-list/auction-list.component';
import { AuctionDetailComponent } from './auction-detail/auction-detail.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms'; 
import { UserDataService } from './user-data.service';
import { ErrorInterceptor} from './helpers/error.interceptor';
import { JwtInterceptor} from './helpers/jwt.interceptor';
import { SearchAuctionsComponent } from './search-auctions/search-auctions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { AuctionCreateComponent } from './auction-create/auction-create.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MyauctionsComponent } from './myauctions/myauctions.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { AuthGuard } from './guards/auth.guard';
import { AdminguardService } from './guards/adminguard.service';
import { WonAuctionsComponent } from './won-auctions/won-auctions.component';

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
    WonAuctionsComponent
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
      { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent },
      { path: 'messages/:act', component: MessagesComponent, canActivate: [AuthGuard]},
      { path: 'create', component: AuctionCreateComponent },
      { path: 'register', component: RegistrationComponent },
      { path: "filters", component: SearchAuctionsComponent },
      { path: "won", component: WonAuctionsComponent }
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
