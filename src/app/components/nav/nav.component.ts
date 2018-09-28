import { Component, OnInit, Input } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private restangular: Restangular) {}

  @Input() navs: string[];

  ngOnInit() {

  }

}
