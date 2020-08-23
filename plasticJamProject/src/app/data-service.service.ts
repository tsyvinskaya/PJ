import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  Db = [];
  pages;
  name;

  constructor() {}
  // this.loadDb(1); console.log(this.Db)

  set userName(value) {
    this.name = value;
 }

 get getuserName() {
     return this.name;
 }

  loadDb (arg) {
    let xhr = new XMLHttpRequest();
    let url = `http://localhost:3001/api/users?page=${arg}&limit=50`;
    xhr.open('GET', url, true);
    xhr.send();
    let that = this;
    xhr.onload = function () {
      that.Db = JSON.parse(this.response).users;
      that.pages = new Array(JSON.parse(this.response).pages);
    //   console.log("667767"); 
    //   return that.Db;
    // console.log(that.Db)
      
    }; 
    
  }

  getData(){
    this.loadDb(1);
    console.log(this.Db)
    return this.Db;
}
getPages(){
  
  return this.pages;
}

}
