import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminLoginComponent } from './admin/components/admin-login/admin-login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './admin/admin.component';
import { StaffComponent } from './admin/components/staff/staff.component';
import { RegisterServiceComponent } from './admin/components/register-service/register-service.component';
import { UserComponent } from './admin/components/user/user.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:"login",
    component:UserLoginComponent
  },
  {
    path:"register",
    component:UserRegisterComponent
  },
  {
    path:"adminlogin",
    component:AdminLoginComponent,
  },
  {
    path:"admin",
    component:AdminComponent,
    children:[
      {
        path:"",
        component:DashboardComponent
      },
      {
        path:"dashboard",
        component:DashboardComponent
      },
      {
        path:"staff",
        component:StaffComponent
      },
      {
        path:"service",
        component:RegisterServiceComponent
      },
      {
        path:"user",
        component:UserComponent
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
