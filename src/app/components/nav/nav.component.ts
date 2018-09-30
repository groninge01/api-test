import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../../services/data.service';
import { UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  navListSub: Subscription;
  navList: string[];
  loading: boolean;

  constructor(
    private dataService: DataService,
    public utils: UtilsService
    ) {}

  ngOnInit() {
    this._getNavList();

  }

  private _getNavList() {
    this.loading = true;
    this.navListSub = this.dataService
      .getNavs$()
      .subscribe(
        res => {
          this.navList = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
        }
      );
  }

  ngOnDestroy() {
    this.navListSub.unsubscribe();
  }

}
