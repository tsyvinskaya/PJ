import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService} from '../data-service.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  Db = [];
  pages;
  displayedColumns: string[] = ['Id', 'First name', 'Last name', 'Email', 'Gender', 'IP address', 'Total clicks', 'Total page views'];

  constructor(private router: Router, private route: ActivatedRoute,private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.loadDb(1);
  }

  loadDb(arg) {
    let xhr = new XMLHttpRequest();
    let url = `http://localhost:3001/api/users?page=${arg}&limit=50`;
    xhr.open('GET', url, true);
    xhr.send();
    let that = this;
    xhr.onload = function () {
      that.Db = JSON.parse(this.response).users;
      that.pages = new Array(JSON.parse(this.response).pages);
    };
  }

  loadNewPage($event: any) {
    this.loadDb($event.target.innerHTML);
  }

  next() {
    let style = getComputedStyle(document.getElementById("pages"));
    let newLeft = (parseInt(style.left, 10)) - 265;
    let currentLeft = (parseInt(style.left, 10));
    
    if (currentLeft! >= -700) {
      document.getElementById("pages").style.left = newLeft + 'px';
    }
  }

  prev() {
    let style = getComputedStyle(document.getElementById("pages"));
    let currentLeft = (parseInt(style.left, 10));
    console.log(currentLeft);
    if (currentLeft <-200) {
      let newLeft = (parseInt(style.left, 10)) + 265;
      document.getElementById("pages").style.left = newLeft + 'px';
    }
    else{
      return;
    }
  }

  goToDetail(id, name, lastname){
  this.router.navigateByUrl(this.router.createUrlTree(['/user/', id]) );
  this.dataService.userName = name + " " +lastname;
}
}
