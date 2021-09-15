import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';
import { Student } from '../models/titles';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss'],
})
export class titlesComponent implements OnInit {
  public titles: title[] = [];

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // json-server --watch db.json --port 3000
    // https://www.youtube.com/watch?v=gQZm-UJDT9I&list=PLiNjao7yG414jM-CS3qVGMvlyKU0kDOkz&index=19
    console.log(
      'Video hướng dẫn cài json-server (Fake server): https://www.youtube.com/watch?v=gQZm-UJDT9I&list=PLiNjao7yG414jM-CS3qVGMvlyKU0kDOkz&index=19'
    );
    console.log(
      'Phải cài json-server và chạy lệnh: json-server --watch db.json --port 3000'
    );
    this.loadData();
  }

  private loadData() {
    this.serverHttp.gettitles().subscribe((data) => {
      console.log('gettitles', data);
      this.titles = data;
      this.common.setTotaltitles(data.length);
    });
  }

  public addtitle() {
    this.router.navigate(['title-form', 0]);
  }

  public deletetitles(titleId) {
    this.serverHttp.deletetitle(titlesId).subscribe((data) => {
      console.log('delete', data);
      this.loadData();
    });
  }

  public edittitle(titleId) {
    this.router.navigate(['title-form', titleId]);
  }

  public sortByCode(dir) {
    if (dir === 'up') {
      this.titles = _.orderBy(this.titles, ['code'], ['desc']);
    } else {
      this.titles = _.orderBy(this.titles, ['code'], ['asc']);
    }
  }
}
