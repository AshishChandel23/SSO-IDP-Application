import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Base from '../../../config/helper';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnInit{
  baseUrl:string = Base.url;
  firstName:string="";
  middleName:string="";
  lastName:string="";
  email:string="";
  contactNo:string="";
  addressLine1:string="";
  addressLine2:string="";
  pincode:string="";
  city:string="";
  state:string="";
  country:string="";
  password:string="";
  confirmPassword="";

  constructor(){}
  ngOnInit(): void {
    
  }
  async registerUser(){
    try {
      const payload = {
        firstName:this.firstName,
        middleName:this.middleName,
        lastName:this.lastName,
        email:this.email,
        contactNo:this.contactNo,
        addressLine1:this.addressLine1,
        addressLine2:this.addressLine2,
        pincode:this.pincode,
        city:this.city,
        state:this.state,
        country:this.country,
        password:this.password,
        confirmPassword:this.confirmPassword,
      }
      const { data } = await axios({
        method:'post',
        url:this.baseUrl+'/auth/register',
        data:payload
      });
      if(!data.error){
        console.log("Data ::>>", data);
        alert(data.message);
        this.firstName = "";
        this.middleName = "";
        this.lastName = "";
        this.email = "";
        this.contactNo = "";
        this.addressLine1 = "";
        this.addressLine2 = "";
        this.pincode = "";
        this.city = "";
        this.state = "";
        this.country = "";
        this.password = "";
        this.confirmPassword = "";
      }
    } catch (error) {
      console.log("Register User Error ::>>",error);
    }
  }
}
