import { Component } from '@angular/core';
import axios from 'axios';
import Base from '../../../../config/helper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  baseUrl:string = Base.url;
  email:string="";
  password:string="";  
  constructor(private router: Router){}
  ngOnInit(): void {
    
  }

  async adminLogin(){
    try {
      const payload = {
        email:this.email,
        password:this.password
      }
      const { data } = await axios({
        method:'post',
        url:this.baseUrl+'/auth/adminLogin',
        data:payload
      });
      if(!data.error){
        localStorage.setItem('accessToken',data.data);
        alert(data.message);
        this.email = "";
        this.password = "";
        this.router.navigate(['/admin']);
        return;
      }
      console.log("Data ::>>", data);
    } catch (error) {
      console.log("Login Error ::>>",error);
    }
  }
}
