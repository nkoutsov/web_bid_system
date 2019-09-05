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

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PendingComponent,
    AdminComponent,
    UserDetailComponent,
    AuctionListComponent,
    AuctionDetailComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'list', component: UserListComponent },
      { path: 'auctions', component: AuctionListComponent },
      { path: 'act', component: PendingComponent },
      { path: 'detail/:id', component: UserDetailComponent },
      { path: 'auction/:id', component: AuctionDetailComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'login', component: LoginComponent },
    ])
  ],
  providers: [
    UserDataService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
