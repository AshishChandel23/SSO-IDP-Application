import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Base from '../../../../config/helper';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  baseUrl:string = Base.url;
  userListData:any[]=[];
  userData:any={};
  
  ngOnInit(): void {
    this.userList();
  }
  
  async getUserById(userId:string){
    try {
      const payload = { userId };
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/user/getUserById',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      });
      this.userData = data.data;
    } catch (error) {
      console.log("Get All User Data ::>>", error);
    }
  }

  async deleteUser(userId:string){
    try {
      const payload = { userId };
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/user/deleteUserById',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      });
      if(!data.error){
        alert(data.message);
        this.userList();
      }
    } catch (error) {
      console.log("Get All User Data ::>>", error);
    }
  }

  async userList(){
    try {
      const payload = {};
      const { data } = await axios({
        method:'post',
        url: this.baseUrl + '/admin/user/getAllUser',
        headers:{
          'ids-access-token':localStorage.getItem('accessToken')
        },
        data:payload
      });
      this.userListData = data.data;
    } catch (error) {
      console.log("Get All User Data ::>>", error);
    }
  }
}
