import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, DoCheck {

  user = [];
  page_views = [];
  clicks = [];
  maxViews: number;
  maxClicks: number;
  ViewPath: string;
  ClicksPath: string;
  userName: string;
  clientWidth;

  constructor(private route: ActivatedRoute, private dataService: DataServiceService) { }

  ngOnInit(): void { this.getUser(); this.getUserName() }

  ngDoCheck(): void { this.getviews(); this.setPath() }

  getUserName() {
    this.userName = this.dataService.getuserName;
  }

  getUser(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    let url = `http://localhost:3001/api/statistics/${id}`;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    let that = this;
    xhr.onload = function () {
      that.user = JSON.parse(this.response).data;
    }
  };

  getviews() {
    for (let i = 0; i < this.user.length; i++) {
      this.page_views.unshift(this.user[i].page_views);
    }
    for (let i = 0; i < this.user.length; i++) {
      this.clicks.unshift(this.user[i].clicks);
    }
    this.maxViews = Math.max.apply(null, this.page_views);
    this.maxClicks = Math.max.apply(null, this.clicks);
  };

  setPath() {
    this.clientWidth=(document.documentElement.clientWidth*0.8);
    let p = Math.floor((this.clientWidth)/6);
    let svgViewHeight = (this.maxViews / 2);
    let svgClicksHeight = (this.maxClicks / 2);

    this.ViewPath = `M 0 ${(this.maxViews - this.page_views[0]) / 2} L ${p}  ${(this.maxViews - this.page_views[1]) / 2} L ${p*2}  ${(this.maxViews - this.page_views[2]) / 2} L ${p*3}  ${(this.maxViews - this.page_views[3]) / 2} L ${p*4}  ${(this.maxViews - this.page_views[4]) / 2} L ${p*5}  ${(this.maxViews - this.page_views[5]) / 2} L ${p*6}  ${(this.maxViews - this.page_views[6]) / 2}`;
    this.ClicksPath = `M 0 ${(this.maxClicks - this.clicks[0]) / 2} L ${p} ${(this.maxClicks - this.clicks[1]) / 2} L ${p*2} ${(this.maxClicks - this.clicks[2]) / 2} L ${p*3} ${(this.maxClicks - this.clicks[3]) / 2} L ${p*4} ${(this.maxClicks - this.clicks[4]) / 2} L ${p*5} ${(this.maxClicks - this.clicks[5]) / 2} L ${p*6} ${(this.maxClicks - this.clicks[6]) / 2}`;
   
    document.getElementById("svg_views").setAttribute("height", svgViewHeight.toString());
    document.getElementById("svg_views").setAttribute("width", this.clientWidth.toString());
    document.getElementById("views").setAttribute("d", this.ViewPath);
    document.getElementById("svg_clicks").setAttribute("height", svgClicksHeight.toString());
    document.getElementById("svg_clicks").setAttribute("width", this.clientWidth.toString());
    document.getElementById("clicks").setAttribute("d", this.ClicksPath);
  };

}



