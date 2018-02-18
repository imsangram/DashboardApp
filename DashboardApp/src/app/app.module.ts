import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from "./app.routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './_guards/index';
import { HomeComponent, LoginComponent, RegisterComponent, DashboardComponent,
  SearchUsersComponent, AddUserComponent} from './_forms/index';
import { ModalComponent } from './_shared/index';

import { AppComponent } from './app.component';
import { AuthenticationService, AlertService, UserService, SearchuserService, PagerService } from './_services/index';
import { HeaderComponent, FooterComponent, SidebarComponent } from './_layout/index';
import { AlertComponent } from './_directives/index';
import { AppConfig } from './app.config';
import { UserProfileComponent } from './_forms/userprofile/userprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    SearchUsersComponent,
    AlertComponent,
    UserProfileComponent,
    AddUserComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule, FormsModule, AppRoutingModule, HttpModule, ReactiveFormsModule  
  ],
  providers: [AuthGuard,AppConfig, AuthenticationService, AlertService, UserService, SearchuserService, PagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
