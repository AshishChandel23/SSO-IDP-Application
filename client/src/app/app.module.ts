import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { AdminComponent } from './admin/admin.component';
import { StaffComponent } from './admin/components/staff/staff.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterServiceComponent } from './admin/components/register-service/register-service.component';
import { UserComponent } from './admin/components/user/user.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    HeaderComponent,
    AdminLoginComponent,
    AdminComponent,
    StaffComponent,
    HomeComponent,
    RegisterServiceComponent,
    UserComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
