import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  public adminLogin ='/adminlogin';
  public dashboard ='/admin/dashboard';
  public routeUser ='/admin/user';
  public routeService ='/admin/service';
  public routeStaff ='/admin/staff';
  constructor(private router: Router){}
  ngOnInit(): void {
    if(localStorage.getItem('accessToken')===null){
      this.router.navigate([this.adminLogin])
      return;
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigate([this.adminLogin])
    return;
  }
}
