import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Base from '../../../config/helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent implements OnInit{
  baseUrl:string = Base.url;
  registerRoute:string='/register';
  email:string="";
  password:string="";  
  constructor(private route:ActivatedRoute){}
  ngOnInit(): void {
    if(this.route.snapshot.queryParams['clientId']){
      localStorage.setItem('cId',this.route.snapshot.queryParams['clientId']);
    } 
  }

  async loginUser(){
    try {
      const payload = {
        email:this.email,
        password:this.password
      }
      const { data } = await axios({
        method:'post',
        url:this.baseUrl+`/auth/login`,
        data:payload
      });
      console.log('payload', payload);
      
      if(!data.error){
        // alert(data.message);
        this.email = "";
        this.password = "";
        localStorage.clear();
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.log("Login Error ::>>",error);
    }
  }
  
}
