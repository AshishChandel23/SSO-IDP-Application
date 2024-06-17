import { Component, OnInit } from '@angular/core';
import Base from '../../../../config/helper';
import axios from 'axios';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  baseUrl:string = Base.url;
  totalUsers:number = 0;
  totalApplications:number = 0;
  totalStaffs:number = 0;
  ngOnInit(): void {
    this.getDetails();
  }
  async getDetails(){
    try {
      const {data} = await axios({
        method:'get',
        url:this.baseUrl+'/admin/getDashboardDetails',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        }});
        this.totalUsers = data.data.users;
        this.totalApplications = data.data.applications;
        this.totalStaffs = data.data.staffs;
        console.log("Dashboard Data ::>>", data);
    } catch (error) {
      console.log("Get Details Dashboard Error ::>>", error);
    }
  }
}
