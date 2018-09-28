import { Component, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  content;
  baseContent;
  id;
  nav;

  constructor(private restangular: Restangular) {}

  ngOnInit() {

    this.baseContent = this.restangular.all('content');

    this.baseContent.getList().subscribe((contentData) => {
      this.content = contentData[0];
      this.id = this.content.id;

      this.restangular.one('content', parseInt(this.id, 10)).all('children').getList().subscribe((navData) => {
        this.nav = navData;
      });

    });
  }

}
