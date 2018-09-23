import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  content;
  baseContent;

  constructor(private restangular: Restangular) {}

  ngOnInit() {

    this.baseContent = this.restangular.all('content');

    this.baseContent.getList().subscribe(data => {
      this.content = data[0];
    });

  }

}
