import { Component, OnInit } from '@angular/core';
import Base from '../../../../config/helper';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  baseUrl:string = Base.url;
  name:string="";
  email:string="";
  contactNo:string="";
  password:string="";
  showForm:boolean = false;
  staffs:any[]=[];
  constructor(private router: Router){}
  ngOnInit(): void {
    this.staffList();
  }
  showingHandler(value:boolean, name:string){
    if(name==='showList'){
      this.showForm = value;
      this.staffList();
    }
    else{
      this.showForm = value;
    }
  }
  async addStaff(){
    try {
      const payload = {
        name:this.name, 
        email:this.email, 
        contactNo:this.contactNo,
        password:this.password, 
      }
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/staff/addStaff',
        data:payload
      })

      if(!data.error){
        alert(data.message);
        this.name="";
        this.email="";
        this.contactNo="";
        this.password="";
        this.showingHandler(false,'showList')
      }
    } catch (error) {
      console.log("Add Staff Error ::>>",error);
    }
  }

  async staffList(){
    try {
      const payload ={
        page:1,
        limit:20
      }
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/staff/getAllStaff',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      })

      if(!data.error){
        this.staffs = data.data;
      }
    } catch (error) {
      console.log("Add Staff Error ::>>",error);
    }
  }

  async deleteStaff(staffId:string){
    try {
      const payload = {
        staffId
      }
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/staff/deleteStaffById',
        data:payload
      })

      if(!data.error){
        alert(data.message);
        this.showingHandler(false,'showList')
      }
    } catch (error) {
      console.log("Delete Staff Error ::>>",error);
    }
  }

}
