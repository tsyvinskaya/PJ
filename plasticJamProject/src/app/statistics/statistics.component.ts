import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataServiceService} from '../data-service.service';
import { Users} from '../user';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit {

  Db:Users;
  pages;
  displayedColumns: string[] = ['Id', 'First name', 'Last name', 'Email', 'Gender', 'IP address', 'Total clicks', 'Total page views'];

  constructor(private router: Router, private route: ActivatedRoute,private dataService: DataServiceService) { }

  ngOnInit(): void {
    this.dataService.getDb(1)
    .subscribe(data => (this.Db = data, this.pages = new Array(data.pages))) 
  }

  loadNewPage($event: any) {
    this.dataService.getDb($event.target.innerHTML)
    .subscribe(data => (this.Db = data))
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
