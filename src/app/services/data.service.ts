import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseContent;

  id = '1106'; // hardcoded for now, should be a service request

  constructor(private restangular: Restangular) {

    this.baseContent = this.restangular.all('content');

  }

  getContent$() {
    return this.baseContent.getList();
  }

  getNavs$() {
    return this.restangular.one('content', parseInt(this.id, 10)).all('children').getList();
  }

}
