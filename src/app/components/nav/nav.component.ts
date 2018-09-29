import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  navListSub: Subscription;
  navList: string[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this._getNavList();

  }

  private _getNavList() {
    // Get future, public events
    this.navListSub = this.dataService
      .getNavs$()
      .subscribe(
        res => {
          this.navList = res;
        },
        err => {
          console.error(err);
        }
      );
  }

}
