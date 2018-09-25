import { Component, OnInit, Input } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private restangular: Restangular) {}

  @Input() nav: string[];

  ngOnInit() {

    // console.log(this.id);

    // this.baseNav = this.restangular.one('content', 1106).all('children');

    // this.baseNav.getList().subscribe(data => {
    //   this.nav = data[0];
    // });

  }

}
