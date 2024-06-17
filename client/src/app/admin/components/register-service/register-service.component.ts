import { Component, OnInit } from '@angular/core';
import Base from '../../../../config/helper';
import axios from 'axios';

@Component({
  selector: 'app-register-service',
  templateUrl: './register-service.component.html',
  styleUrl: './register-service.component.css'
})
export class RegisterServiceComponent implements OnInit{
  baseUrl:string = Base.url;
  applicationName:string="";
  url:string="";
  callbackUrl:string="";
  appData:any[]=[];
  applicationData:any={};
  showForm:boolean=false;

  ngOnInit(): void {
        this.applicationList();
  }

  showingHandler(value:boolean, name:string){
    if(name==='showList'){
      this.showForm = value;
      this.applicationList();
    }
    else{
      this.showForm = value;
    }
  }

  async registerApplication(){
    try {
      const payload = {
        applicationName:this.applicationName,
        url:this.url,
        callbackUrl:this.callbackUrl
      }
      const { data } = await axios({
        method:'POST',
        url:this.baseUrl + '/admin/application/registerApplication',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload,
      });
      if(!data.error){
        this.applicationName = "";
        this.url = "";
        this.callbackUrl = "";
        alert(data.message);
        this.showingHandler(false,'showList')
      }
    } catch (error) {
      console.log("Register Application Error ::>>", error);
    }
  }

  async getApplicationById(appId:string){
    try {
      const payload = { applicationId:appId };
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/application/getApplicationById',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      });
      this.applicationData = data.data;
    } catch (error) {
      console.log("Get All User Data ::>>", error);
    }
  }

  async deleteApplication(appId:string){
    try {
      const payload = { applicationId:appId };
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/application/deleteApplicationById',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      });
      if(!data.error){
        alert(data.message);
        this.showingHandler(false,'showList')
      }
    } catch (error) {
      console.log("Delete Application Data Error::>>", error);
    }
  }

  async regenrateCredentials(appId:string){
    try {
      const payload = { applicationId:appId };
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/application/regenrateIdAndSecretByAppId',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      });
      this.applicationData = data.data;
      console.log("Update application ::>>", this.applicationData);
    } catch (error) {
      console.log("Rengrate Application Data ::>>", error);
    }
  }

  async applicationList(){
    try {
      const payload = {
        page:1,
        limit:10
      }
      const { data } = await axios({
        method:'POST',
        url:this.baseUrl + '/admin/application/getAllApplication',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      })
      if(!data.error){
        this.appData = data.data;
      }
    } catch (error) {
      console.log("Get All Application Error ::>>", error);
    }
  }
}
